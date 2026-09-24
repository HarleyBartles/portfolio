"""Typed, bounded OpenRouter Decisions transport for reader-panel experiments."""

from __future__ import annotations

import math
import re
from dataclasses import dataclass, replace

import httpx
from openrouter import OpenRouter, errors as openrouter_errors
from openrouter.utils import BackoffStrategy, RetryConfig

from reader_panel_source import Article, Beat, ReaderProfile


MODEL = "typesafe/jev-1.13"
CHOICES = {
    "read_closely": "The reader remains interested and reads this beat attentively.",
    "skim": "The reader remains in the article but scans this beat rather than reading closely.",
    "leave_lost_interest": "The reader abandons the article because interest or relevance has been lost, not because their goal was met.",
    "stop_satisfied": "The reader stops because the article has already delivered what they came for, not because interest was lost.",
}


class DecisionError(RuntimeError):
    """A remote decision failed without exposing request state or credentials."""

    def __init__(self, message: str, attempts: int = 1):
        self.attempts = attempts
        super().__init__(message)


@dataclass(frozen=True)
class Decision:
    choice: str
    probabilities: dict[str, float]
    cost_usd: float
    input_tokens: int | None
    model: str
    attempts: int = 1


def build_request(profile: ReaderProfile, article: Article, beat: Beat) -> dict:
    reader = {
        "arrival_intent": profile.arrival_intent,
        "background": profile.background,
        "desired_payoff": profile.desired_payoff,
    }
    if profile.drawn_in_by and profile.put_off_by:
        reader.update(drawn_in_by=profile.drawn_in_by, put_off_by=profile.put_off_by)
    return {
        "model": MODEL,
        "state": {
            "reader": reader,
            "article_title": article.title,
            "reader_promise": article.promise,
            "visible_text": beat.visible_prefix,
        },
        "questions": {
            "attention": {
                "type": "choice",
                "instructions": "At this point in the article, what does this reader do next? Distinguish lost interest from stopping satisfied.",
                "criteria": CHOICES,
            }
        },
    }


def _parse_decision(result: dict, criteria: dict[str, str] = CHOICES) -> Decision:
    model = result.get("model")
    if not isinstance(model, str) or not (
        model == MODEL or re.fullmatch(r"typesafe/jev-1\.13-\d{8}", model)
    ):
        raise DecisionError("Decision response used an unexpected model")
    answer = result.get("answers", {}).get("attention") if isinstance(result.get("answers"), dict) else None
    if not isinstance(answer, dict) or answer.get("type") != "choice" or answer.get("choice") not in criteria:
        raise DecisionError("Decision response lacked a valid typed choice")
    probabilities = answer.get("probabilities", {})
    if not isinstance(probabilities, dict) or any(
        key not in criteria or isinstance(value, bool) or not isinstance(value, (int, float))
        or not math.isfinite(value) or not 0 <= value <= 1
        for key, value in probabilities.items()
    ):
        raise DecisionError("Decision response had invalid probabilities")
    usage = result.get("usage")
    if not isinstance(usage, dict):
        raise DecisionError("Decision response lacked usage")
    cost = usage.get("cost")
    if isinstance(cost, bool) or not isinstance(cost, (int, float)) or not math.isfinite(cost) or cost < 0:
        raise DecisionError("Decision response lacked a valid usage cost")
    tokens = usage.get("input_tokens", usage.get("inputTokens"))
    if tokens is not None and (isinstance(tokens, bool) or not isinstance(tokens, int) or tokens < 0):
        raise DecisionError("Decision response had invalid token usage")
    return Decision(answer["choice"], probabilities, float(cost), tokens, model)


class _WireLimitReached(Exception):
    """Stop the SDK before it sends a request beyond the panel's call cap."""


class DecisionClient:
    """Use the OpenRouter SDK while preserving the panel's wire-call accounting."""

    def __init__(self, api_key: str, *, http_client: httpx.Client | None = None):
        self._attempts = 0
        self._max_attempts = 0
        self._http_client = http_client or httpx.Client(follow_redirects=True)
        self._http_client.event_hooks["request"].append(self._count_request)
        self._sdk = OpenRouter(api_key=api_key, client=self._http_client, timeout_ms=15_000)
        self._retries = RetryConfig(
            "backoff", BackoffStrategy(500, 1_000, 2.0, 1_500, jitter_ms=0), True,
            status_codes_override=["408", "429", "500", "502", "503", "504", "524", "529"],
        )

    def _count_request(self, request: httpx.Request) -> None:
        if self._attempts >= self._max_attempts:
            raise _WireLimitReached()
        self._attempts += 1

    def __enter__(self) -> DecisionClient:
        self._sdk.__enter__()
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> None:
        self._sdk.__exit__(exc_type, exc_value, traceback)

    def decide(self, profile: ReaderProfile, article: Article, beat: Beat, max_attempts: int) -> Decision:
        return self._call(build_request(profile, article, beat), CHOICES, max_attempts)

    def decide_experiment(
        self, profile: ReaderProfile, title: str, promise: str, visible_text: str,
        stage: str, criteria: dict[str, str], max_attempts: int,
    ) -> Decision:
        if not criteria or any(not key or not value for key, value in criteria.items()):
            raise DecisionError("Experiment choice criteria are invalid", attempts=0)
        reader = {"arrival_intent": profile.arrival_intent, "background": profile.background,
                  "desired_payoff": profile.desired_payoff}
        if profile.drawn_in_by and profile.put_off_by:
            reader.update(drawn_in_by=profile.drawn_in_by, put_off_by=profile.put_off_by)
        if stage == "post-read-effect":
            instruction = (
                "The reader chose to read the optional additional piece after ending their main reading. "
                "They may have stopped satisfied before the article's final passage. "
                "Compared with their satisfaction immediately before opening it, did that reading "
                "increase, maintain or decrease satisfaction with the article for their original goal? "
                "Judge the added reading, not whether they would recommend the article."
            )
        elif stage == "post-choice":
            instruction = (
                "This reader has ended their main reading, either at the article's final passage or "
                "earlier because they were satisfied. They can now see only the title and standfirst "
                "of an optional additional read. Would they open and read it or skip it? "
                "The reader cannot see its body unless they choose open."
            )
        elif stage in {"aside-choice", "return-choice"}:
            instruction = (
                "At this point in the article, what does this reader do next? "
                "Choose only from the offered actions. The reader cannot see text beyond visible_text."
            )
        else:
            instruction = (
                "At this point in the article, what does this reader do next? "
                "Distinguish lost interest from stopping satisfied."
            )
        payload = {
            "model": MODEL,
            "state": {"reader": reader, "article_title": title, "reader_promise": promise,
                      "visible_text": visible_text},
            "questions": {"attention": {"type": "choice", "instructions": instruction,
                                        "criteria": criteria}},
        }
        return self._call(payload, criteria, max_attempts)

    def _call(self, payload: dict, criteria: dict[str, str], max_attempts: int) -> Decision:
        if not 1 <= max_attempts <= 3:
            raise DecisionError("Decision attempt limit must be 1–3", attempts=0)
        self._attempts = 0
        self._max_attempts = max_attempts
        try:
            response = self._sdk.alpha.decisions.create(
                model=payload["model"], questions=payload["questions"],
                state=payload["state"], retries=self._retries,
            )
            return replace(_parse_decision(response.model_dump(), criteria), attempts=self._attempts)
        except _WireLimitReached:
            raise DecisionError("Decision retry limit reached", attempts=self._attempts) from None
        except openrouter_errors.OpenRouterError as error:
            raise DecisionError(f"Decision request failed with HTTP {error.status_code}", attempts=self._attempts) from None
        except httpx.HTTPError:
            raise DecisionError("Decision endpoint unavailable", attempts=self._attempts) from None
        except DecisionError as error:
            raise DecisionError(str(error), attempts=self._attempts) from None
        except Exception:
            raise DecisionError("Decision response could not be validated", attempts=self._attempts) from None
