"""Typed, bounded OpenRouter Decisions transport for reader-panel experiments."""

from __future__ import annotations

import json
import math
import re
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from typing import Callable, Literal

from reader_panel_source import Article, Beat, ReaderProfile


ENDPOINT = "https://openrouter.ai/api/alpha/decisions"
MODEL = "typesafe/jev-1.13"
CHOICES = {
    "read_closely": "The reader remains interested and reads this beat attentively.",
    "skim": "The reader remains in the article but scans this beat rather than reading closely.",
    "leave_lost_interest": "The reader abandons the article because interest or relevance has been lost, not because their goal was met.",
    "stop_satisfied": "The reader stops because the article has already delivered what they came for, not because interest was lost.",
}
DecisionChoice = Literal["read_closely", "skim", "leave_lost_interest", "stop_satisfied"]
Transport = Callable[[dict, str], dict]


class DecisionError(RuntimeError):
    """A remote decision failed without exposing request state or credentials."""


class DecisionHTTPError(DecisionError):
    def __init__(self, status: int, retry_after: float = 0):
        self.status = status
        delay = float(retry_after)
        self.retry_after = min(max(delay, 0.0), 2.0) if math.isfinite(delay) else 0.0
        super().__init__(f"Decision endpoint returned HTTP {status}")


@dataclass(frozen=True)
class Decision:
    choice: DecisionChoice
    probabilities: dict[str, float]
    cost_usd: float
    input_tokens: int | None
    model: str


def build_request(profile: ReaderProfile, article: Article, beat: Beat) -> dict:
    return {
        "model": MODEL,
        "state": {
            "reader": {
                "arrival_intent": profile.arrival_intent,
                "background": profile.background,
                "desired_payoff": profile.desired_payoff,
            },
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


def _http_transport(payload: dict, api_key: str) -> dict:
    request = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            body = response.read(1_000_001)
    except urllib.error.HTTPError as error:
        try:
            delay = float(error.headers.get("Retry-After", "0")) if error.headers else 0
        except ValueError:
            delay = 0
        raise DecisionHTTPError(error.code, delay) from None
    except (urllib.error.URLError, TimeoutError) as error:
        raise DecisionError("Decision endpoint unavailable") from None
    if len(body) > 1_000_000:
        raise DecisionError("Decision response exceeded size limit")
    try:
        result = json.loads(body)
    except (UnicodeError, json.JSONDecodeError):
        raise DecisionError("Decision endpoint returned invalid JSON") from None
    if not isinstance(result, dict):
        raise DecisionError("Decision endpoint returned an invalid object")
    return result


def _parse_decision(result: dict) -> Decision:
    model = result.get("model")
    if not isinstance(model, str) or not (
        model == MODEL or re.fullmatch(r"typesafe/jev-1\.13-\d{8}", model)
    ):
        raise DecisionError("Decision response used an unexpected model")
    answer = result.get("answers", {}).get("attention") if isinstance(result.get("answers"), dict) else None
    if not isinstance(answer, dict) or answer.get("type") != "choice" or answer.get("choice") not in CHOICES:
        raise DecisionError("Decision response lacked a valid typed choice")
    probabilities = answer.get("probabilities", {})
    if not isinstance(probabilities, dict) or any(
        key not in CHOICES or isinstance(value, bool) or not isinstance(value, (int, float))
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
    tokens = usage.get("inputTokens")
    if tokens is not None and (isinstance(tokens, bool) or not isinstance(tokens, int) or tokens < 0):
        raise DecisionError("Decision response had invalid token usage")
    return Decision(answer["choice"], probabilities, float(cost), tokens, model)


def decide(
    profile: ReaderProfile,
    article: Article,
    beat: Beat,
    *,
    api_key: str,
    transport: Transport | None = None,
) -> Decision:
    """Ask one future-blind question; retry only a bounded rate limit."""
    payload = build_request(profile, article, beat)
    send = transport or _http_transport
    for attempt in range(3):
        try:
            return _parse_decision(send(payload, api_key))
        except DecisionHTTPError as error:
            if error.status != 429 or attempt == 2:
                raise DecisionError(f"Decision request failed with HTTP {error.status}") from None
            time.sleep(error.retry_after)
        except DecisionError:
            raise
        except Exception:
            raise DecisionError("Decision request failed before validation") from None
    raise DecisionError("Decision retry limit reached")
