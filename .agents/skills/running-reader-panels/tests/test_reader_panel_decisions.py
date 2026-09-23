from __future__ import annotations

import sys
import unittest
import urllib.error
from pathlib import Path
from unittest.mock import patch


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_decisions import (  # noqa: E402
    DecisionError,
    DecisionHTTPError,
    DecisionUnavailableError,
    _http_transport,
    build_request,
    decide,
)
from reader_panel_source import Article, Beat, ReaderProfile  # noqa: E402


PROFILE = ReaderProfile("peer", "evaluate", "engineer", "a useful mechanism")
ARTICLE = Article(Path("synthetic.md"), "Title", "Promise", (Beat(0, "Opening", "Visible."),), "abc")


def response(choice: str = "skim", cost: float = 0.00001) -> dict:
    return {
        "answers": {"attention": {
            "type": "choice", "choice": choice, "confidence": 0.6,
            "probabilities": {"read_closely": 0.1, "skim": 0.6,
                              "leave_lost_interest": 0.2, "stop_satisfied": 0.1},
        }},
        "model": "typesafe/jev-1.13-20260917", "provider": "TypeSafe",
        "usage": {"cost": cost, "inputTokens": 100, "outputTokens": 4},
    }


class DecisionTests(unittest.TestCase):
    def test_sparse_payload_is_unchanged_and_rich_constraints_are_sent(self) -> None:
        reader = build_request(PROFILE, ARTICLE, ARTICLE.beats[0])["state"]["reader"]
        self.assertEqual(reader, {"arrival_intent": "evaluate", "background": "engineer",
                                  "desired_payoff": "a useful mechanism"})
        rich = ReaderProfile("peer", "evaluate", "engineer", "insight", "evidence", "hype")
        rich_reader = build_request(rich, ARTICLE, ARTICLE.beats[0])["state"]["reader"]
        self.assertEqual(rich_reader, reader | {"desired_payoff": "insight",
                                                "drawn_in_by": "evidence", "put_off_by": "hype"})
        cohort_reader = ReaderProfile("peer-r01", "evaluate", "engineer", "insight",
                                      "evidence", "hype", "peer")
        self.assertEqual(build_request(cohort_reader, ARTICLE, ARTICLE.beats[0])["state"]["reader"], rich_reader)

    def test_request_is_typed_and_future_blind(self) -> None:
        captured = []

        def fake(payload: dict, api_key: str) -> dict:
            captured.append(payload)
            return response()

        result = decide(PROFILE, ARTICLE, ARTICLE.beats[0], api_key="private-key", transport=fake)
        self.assertEqual(result.choice, "skim")
        self.assertEqual(result.input_tokens, 100)
        self.assertEqual(captured[0]["model"], "typesafe/jev-1.13")
        self.assertEqual(captured[0]["questions"]["attention"]["type"], "choice")
        self.assertEqual(set(captured[0]["questions"]["attention"]["criteria"]), {
            "read_closely", "skim", "leave_lost_interest", "stop_satisfied"
        })
        self.assertEqual(captured[0]["state"]["visible_text"], "Visible.")
        self.assertNotIn("private-key", repr(captured))

    def test_raw_http_usage_uses_snake_case_tokens(self) -> None:
        value = response()
        value["usage"] = {"cost": 0.00001, "input_tokens": 87, "output_tokens": 4}
        result = decide(PROFILE, ARTICLE, ARTICLE.beats[0], api_key="private-key", transport=lambda *_: value)
        self.assertEqual(result.input_tokens, 87)

    def test_malformed_model_answer_cost_and_probabilities_fail_closed(self) -> None:
        for mutation in (
            lambda r: r.update(model="other/model"),
            lambda r: r["answers"]["attention"].update(type="score"),
            lambda r: r["answers"]["attention"].update(choice="invented"),
            lambda r: r["usage"].pop("cost"),
            lambda r: r["answers"]["attention"]["probabilities"].update(skim=float("nan")),
        ):
            value = response()
            mutation(value)
            with self.subTest(value=value), self.assertRaises(DecisionError):
                decide(PROFILE, ARTICLE, ARTICLE.beats[0], api_key="private-key", transport=lambda *_: value)

    def test_429_retries_twice_then_stops(self) -> None:
        attempts = []

        def limited(payload: dict, api_key: str) -> dict:
            attempts.append(1)
            raise DecisionHTTPError(429, 0)

        with self.assertRaises(DecisionError):
            decide(PROFILE, ARTICLE, ARTICLE.beats[0], api_key="private-key", transport=limited)
        self.assertEqual(len(attempts), 3)

    def test_nonfinite_retry_after_does_not_extend_retry(self) -> None:
        self.assertEqual(DecisionHTTPError(429, float("nan")).retry_after, 0)

    def test_non_429_error_does_not_retry_or_leak(self) -> None:
        attempts = []

        def denied(payload: dict, api_key: str) -> dict:
            attempts.append(1)
            raise DecisionHTTPError(401, 0)

        with self.assertRaises(DecisionError) as error:
            decide(PROFILE, ARTICLE, ARTICLE.beats[0], api_key="private-key", transport=denied)
        self.assertEqual(len(attempts), 1)
        self.assertNotIn("private-key", str(error.exception))
        self.assertNotIn("Visible.", str(error.exception))

    def test_brief_endpoint_outage_recovers_with_bounded_backoff(self) -> None:
        attempts = []

        def flaky(payload: dict, api_key: str) -> dict:
            attempts.append(1)
            if len(attempts) < 3:
                raise DecisionUnavailableError("Decision endpoint unavailable")
            return response()

        with patch("reader_panel_decisions.time.sleep") as sleep:
            result = decide(PROFILE, ARTICLE, ARTICLE.beats[0], api_key="private-key", transport=flaky)

        self.assertEqual(result.attempts, 3)
        self.assertEqual(len(attempts), 3)
        self.assertEqual([call.args[0] for call in sleep.call_args_list], [0.5, 1.0])

    def test_persistent_outage_stops_after_three_attempts(self) -> None:
        attempts = []

        def offline(payload: dict, api_key: str) -> dict:
            attempts.append(1)
            raise DecisionUnavailableError("Decision endpoint unavailable")

        with patch("reader_panel_decisions.time.sleep") as sleep, self.assertRaises(DecisionError) as error:
            decide(PROFILE, ARTICLE, ARTICLE.beats[0], api_key="private-key", transport=offline)

        self.assertEqual(error.exception.attempts, 3)
        self.assertEqual(len(attempts), 3)
        self.assertEqual([call.args[0] for call in sleep.call_args_list], [0.5, 1.0])

    def test_temporary_http_failure_retries_but_auth_failure_does_not(self) -> None:
        attempts = []

        def temporary(payload: dict, api_key: str) -> dict:
            attempts.append(1)
            if len(attempts) == 1:
                raise DecisionHTTPError(503)
            return response()

        with patch("reader_panel_decisions.time.sleep") as sleep:
            result = decide(PROFILE, ARTICLE, ARTICLE.beats[0], api_key="private-key", transport=temporary)

        self.assertEqual(result.attempts, 2)
        sleep.assert_called_once_with(0.5)

    def test_transport_classifies_network_failure_as_retryable(self) -> None:
        with patch("reader_panel_decisions.urllib.request.urlopen", side_effect=urllib.error.URLError("offline")):
            with self.assertRaises(DecisionUnavailableError) as error:
                _http_transport({"model": "probe"}, "private-key")
        self.assertEqual(str(error.exception), "Decision endpoint unavailable")
        self.assertNotIn("private-key", str(error.exception))
