from __future__ import annotations

import sys
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from reader_panel_decisions import (  # noqa: E402
    DecisionError,
    DecisionHTTPError,
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
