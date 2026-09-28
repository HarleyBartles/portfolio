"""Run local repository validation as a named suite."""
from __future__ import annotations

import sys
from pathlib import Path

from .link_hygiene import check_repository_links
from .portfolio import validate_portfolio

ROOT = Path(__file__).resolve().parents[2]

def main() -> int:
    link_errors = check_repository_links()
    warnings = []
    findings = validate_portfolio(ROOT, warnings=warnings)
    if warnings:
        print("[repository-validation] warnings:", file=sys.stderr)
        for warning in warnings:
            print(f"  - {warning}", file=sys.stderr)
    if link_errors:
        print("[repository-validation] link findings:", file=sys.stderr)
        for error in link_errors:
            print(f"  - {error}", file=sys.stderr)
    if findings:
        print("[repository-validation] portfolio findings:", file=sys.stderr)
        for finding in findings:
            print(f"  - {finding}", file=sys.stderr)
    if link_errors or findings:
        return 1
    print("[repository-validation] links, content, privacy, custody, and public assets OK")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
