from __future__ import annotations

import json
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_decisions import DecisionClient, DecisionError, _parse_decision, build_request  # noqa: E402
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
        "usage": {"cost": cost, "input_tokens": 100, "output_tokens": 4},
    }


class DecisionTests(unittest.TestCase):
    def test_experiment_choice_uses_only_offered_options_and_visible_text(self) -> None:
        captured = []

        def handler(request: httpx.Request) -> httpx.Response:
            captured.append(json.loads(request.content))
            result = response()
            result["answers"]["attention"]["choice"] = "return_later"
            result["answers"]["attention"]["probabilities"] = {"return_later": 1.0}
            return httpx.Response(200, json=result)

        with httpx.Client(transport=httpx.MockTransport(handler)) as http_client:
            result = DecisionClient("private-key", http_client=http_client).decide_experiment(
                PROFILE, "Title", "Promise", "VISIBLE INVITATION", "aside-choice",
                {"open_now": "Read now", "return_later": "Return later", "skip": "Skip"},
                3,
            )
        self.assertEqual(result.choice, "return_later")
        self.assertEqual(captured[0]["state"]["visible_text"], "VISIBLE INVITATION")
        self.assertEqual(set(captured[0]["questions"]["attention"]["criteria"]),
                         {"open_now", "return_later", "skip"})
        self.assertNotIn("HIDDEN ASIDE", repr(captured))

    def test_sparse_payload_and_rich_reader_constraints(self) -> None:
        reader = build_request(PROFILE, ARTICLE, ARTICLE.beats[0])["state"]["reader"]
        self.assertEqual(reader, {"arrival_intent": "evaluate", "background": "engineer",
                                  "desired_payoff": "a useful mechanism"})
        rich = ReaderProfile("peer", "evaluate", "engineer", "insight", "evidence", "hype")
        rich_reader = build_request(rich, ARTICLE, ARTICLE.beats[0])["state"]["reader"]
        self.assertEqual(rich_reader, reader | {"desired_payoff": "insight",
                                                "drawn_in_by": "evidence", "put_off_by": "hype"})

    def test_sdk_request_is_typed_future_blind_and_has_no_key_in_state(self) -> None:
        captured = []

        def handler(request: httpx.Request) -> httpx.Response:
            captured.append(json.loads(request.content))
            return httpx.Response(200, json=response())

        with httpx.Client(transport=httpx.MockTransport(handler)) as http_client:
            result = DecisionClient("private-key", http_client=http_client).decide(
                PROFILE, ARTICLE, ARTICLE.beats[0], 3)

        self.assertEqual(result.choice, "skim")
        self.assertEqual(result.input_tokens, 100)
        self.assertEqual(result.attempts, 1)
        self.assertEqual(captured[0]["model"], "typesafe/jev-1.13")
        self.assertEqual(captured[0]["questions"]["attention"]["type"], "choice")
        self.assertEqual(captured[0]["state"]["visible_text"], "Visible.")
        self.assertNotIn("private-key", repr(captured))

    def test_sdk_retries_overload_and_counts_each_wire_attempt(self) -> None:
        statuses = [529, 529, 200]

        def handler(request: httpx.Request) -> httpx.Response:
            status = statuses.pop(0)
            return httpx.Response(status, json=response() if status == 200 else {"error": "busy"})

        with httpx.Client(transport=httpx.MockTransport(handler)) as http_client:
            client = DecisionClient("private-key", http_client=http_client)
            with patch("openrouter.utils.retries.time.sleep") as sleep:
                result = client.decide(PROFILE, ARTICLE, ARTICLE.beats[0], 3)

        self.assertEqual(result.attempts, 3)
        self.assertEqual(len(sleep.call_args_list), 2)
        self.assertEqual(statuses, [])

    def test_sdk_retries_connection_error(self) -> None:
        calls = []

        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(1)
            if len(calls) == 1:
                raise httpx.ConnectError("offline")
            return httpx.Response(200, json=response())

        with httpx.Client(transport=httpx.MockTransport(handler)) as http_client:
            with patch("openrouter.utils.retries.time.sleep"):
                result = DecisionClient("private-key", http_client=http_client).decide(
                    PROFILE, ARTICLE, ARTICLE.beats[0], 3)
        self.assertEqual(result.attempts, 2)

    def test_sdk_never_exceeds_wire_attempt_budget(self) -> None:
        calls = []

        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(1)
            return httpx.Response(529, json={"error": "busy"})

        with httpx.Client(transport=httpx.MockTransport(handler)) as http_client:
            client = DecisionClient("private-key", http_client=http_client)
            with patch("openrouter.utils.retries.time.sleep"), self.assertRaises(DecisionError) as error:
                client.decide(PROFILE, ARTICLE, ARTICLE.beats[0], 2)

        self.assertEqual(error.exception.attempts, 2)
        self.assertEqual(len(calls), 2)

    def test_auth_failure_does_not_retry_or_leak(self) -> None:
        calls = []

        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(1)
            return httpx.Response(401, json={"error": {"message": "unauthorized"}})

        with httpx.Client(transport=httpx.MockTransport(handler)) as http_client:
            with self.assertRaises(DecisionError) as error:
                DecisionClient("private-key", http_client=http_client).decide(
                    PROFILE, ARTICLE, ARTICLE.beats[0], 3)

        self.assertEqual(len(calls), 1)
        self.assertEqual(error.exception.attempts, 1)
        self.assertNotIn("private-key", str(error.exception))

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
                _parse_decision(value)

    def test_attempt_limit_is_bounded(self) -> None:
        with httpx.Client(transport=httpx.MockTransport(lambda _: httpx.Response(200, json=response()))) as http_client:
            with self.assertRaises(DecisionError) as error:
                DecisionClient("private-key", http_client=http_client).decide(
                    PROFILE, ARTICLE, ARTICLE.beats[0], 4)
        self.assertEqual(error.exception.attempts, 0)
