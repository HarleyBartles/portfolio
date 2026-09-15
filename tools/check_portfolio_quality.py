#!/usr/bin/env python3
"""Fail when objective portfolio content, privacy, or asset contracts drift."""

from __future__ import annotations

import sys
from pathlib import Path

from portfolio_quality import validate_portfolio


ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    warnings = []
    findings = validate_portfolio(ROOT, warnings=warnings)
    if warnings:
        print("[tools/check_portfolio_quality] warnings:", file=sys.stderr)
        for warning in warnings:
            print(f"  - {warning}", file=sys.stderr)
    if findings:
        print("[tools/check_portfolio_quality] findings:", file=sys.stderr)
        for finding in findings:
            print(f"  - {finding}", file=sys.stderr)
        return 1

    print("[tools/check_portfolio_quality] content, privacy, and public assets OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
