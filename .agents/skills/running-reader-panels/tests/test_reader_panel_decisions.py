from __future__ import annotations

import asyncio
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
    def test_sync_context_closes_its_async_transport_client(self) -> None:
        async_client = httpx.AsyncClient(transport=httpx.MockTransport(lambda _: httpx.Response(200)))
        sync_client = httpx.Client(transport=httpx.MockTransport(lambda _: httpx.Response(200)))
        with DecisionClient("private-key", http_client=sync_client, async_http_client=async_client):
            self.assertFalse(async_client.is_closed)
        self.assertTrue(async_client.is_closed)

    def test_async_sdk_calls_keep_retry_attempt_counts_request_local(self) -> None:
        counts = {"A": 0, "B": 0}

        async def handler(request: httpx.Request) -> httpx.Response:
            payload = json.loads(request.content)
            key = payload["state"]["visible_text"]
            counts[key] += 1
            if key == "A" and counts[key] == 1:
                return httpx.Response(529, json={"error": "busy"})
            value = response("skim")
            value["answers"]["attention"]["probabilities"] = {"skim": 1.0}
            return httpx.Response(200, json=value)

        async def run() -> tuple[Decision, Decision]:
            async_http_client = httpx.AsyncClient(transport=httpx.MockTransport(handler))
            async with DecisionClient("private-key", async_http_client=async_http_client) as client:
                with patch("openrouter.utils.retries.asyncio.sleep", new_callable=unittest.mock.AsyncMock):
                    return await asyncio.gather(*(
                        client.decide_experiment_async(
                            PROFILE, "Title", "Promise", key, "opening", {"skim": "Scan"}, 3,
                        ) for key in ("A", "B")
                    ))

        first, second = asyncio.run(run())
        self.assertEqual((first.attempts, second.attempts), (2, 1))
        self.assertEqual(counts, {"A": 2, "B": 1})

    def test_optional_with_defer_promises_an_end_offer_and_names_terminal_context(self) -> None:
        captured = []

        def handler(request: httpx.Request) -> httpx.Response:
            payload = json.loads(request.content)
            captured.append(payload)
            answer = next(iter(payload["questions"]["attention"]["criteria"]))
            value = response(answer)
            value["answers"]["attention"]["probabilities"] = {answer: 1.0}
            return httpx.Response(200, json=value)

        with httpx.Client(transport=httpx.MockTransport(handler)) as http_client:
            client = DecisionClient("private-key", http_client=http_client)
            client.decide_experiment(PROFILE, "Title", "Promise", "Invitation", "sql:inline-choice",
                                     {"read_now": "Read", "defer_to_end": "Continue"}, 1)
            client.decide_experiment(PROFILE, "Title", "Promise", "Article end", "sql:terminal-choice",
                                     {"read": "Read", "skip": "Skip"}, 1)
        self.assertIn("offered this reading again at the end", captured[0]["questions"]["attention"]["instructions"])
        self.assertIn("origin of this offer is recorded separately", captured[1]["questions"]["attention"]["instructions"])

    def test_post_read_prompts_allow_early_satisfied_exit(self) -> None:
        captured = []

        def handler(request: httpx.Request) -> httpx.Response:
            payload = json.loads(request.content)
            captured.append(payload)
            options = payload["questions"]["attention"]["criteria"]
            chosen = "open" if "open" in options else "increased"
            result = response()
            result["answers"]["attention"]["choice"] = chosen
            result["answers"]["attention"]["probabilities"] = {chosen: 1.0}
            return httpx.Response(200, json=result)

        with httpx.Client(transport=httpx.MockTransport(handler)) as http_client:
            client = DecisionClient("private-key", http_client=http_client)
            client.decide_experiment(PROFILE, "Title", "Promise", "VISIBLE PREFIX", "post-choice",
                                     {"open": "Read", "skip": "Skip"}, 3)
            client.decide_experiment(PROFILE, "Title", "Promise", "VISIBLE PREFIX AND EXTRA",
                                     "post-read-effect",
                                     {"increased": "More", "maintained": "Same", "decreased": "Less"}, 3)
        self.assertTrue(all("stopped satisfied before" in p["questions"]["attention"]["instructions"]
                            or "earlier because they were satisfied" in
                            p["questions"]["attention"]["instructions"] for p in captured))
        self.assertEqual(captured[0]["state"]["visible_text"], "VISIBLE PREFIX")
        self.assertEqual(captured[1]["state"]["visible_text"], "VISIBLE PREFIX AND EXTRA")

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
