#!/usr/bin/env python3
"""Report inspectable article and public-language facts without editorial scoring."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass, replace
from pathlib import Path
from typing import Literal, Sequence


TEXT_SUFFIXES = frozenset({".html", ".md", ".ts", ".tsx"})
EXCLUDED_PARTS = frozenset({".agents", "dist", "node_modules", "test", "test-results", "tests"})
EXCLUDED_NAMES = frozenset({"INDEX.md"})
EXCLUDED_NAME_MARKERS = (".test.", ".spec.", ".generated.")
PUBLIC_SOURCE_CLASSES = (
    ("client-index", Path("src/client/index.html")),
    ("client-source", Path("src/client/src")),
    ("client-public", Path("src/client/public")),
)
NONPUBLIC_CLIENT_OWNERS = frozenset(
    {"assets", "dist", "e2e", "node_modules", "scripts", "test-results"}
)
NONPUBLIC_SRC_FILES = frozenset({"INDEX.md", "README.md"})
NONPUBLIC_CLIENT_FILES = frozenset(
    {
        "INDEX.md",
        "README.md",
        "playwright.config.ts",
        "vite.config.ts",
        "vitest.config.ts",
    }
)
OBJECTIVE_TERMS = ("fuck", "cunt", "twat", "cock")
CONTEXTUAL_TERMS = ("shit", "piss")
WORD_RE = re.compile(r"\b[\w'’-]+\b", re.UNICODE)
SENTENCE_SPLIT_RE = re.compile(r"(?<=[.!?])(?:[\"')\]]*)\s+")
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)\s]+)(?:\s+[^)]*)?\)")


class SourceContractError(RuntimeError):
    """Raised when text appears beneath an unclassified public source owner."""


@dataclass(frozen=True)
class AuditThresholds:
    repeated_phrase_words: int = 5


@dataclass(frozen=True)
class Finding:
    kind: str
    path: str
    line: int
    context: str
    severity: Literal["observation", "contextual-review", "objective-breach"]
    evidence: Literal["fact", "heuristic"] = "fact"
    term: str | None = None
    related_path: str | None = None
    related_line: int | None = None


@dataclass(frozen=True)
class ArticleObservation:
    path: str
    prose: str
    word_count: int
    declared_reading_time: str | None
    headings: tuple[str, ...]
    paragraph_word_counts: tuple[int, ...]
    sentence_word_counts: tuple[int, ...]
    one_sentence_paragraph_lines: tuple[int, ...]
    links: tuple[str, ...]


@dataclass(frozen=True)
class CorpusReport:
    articles: tuple[ArticleObservation, ...]
    findings: tuple[Finding, ...]


@dataclass(frozen=True)
class LanguageReport:
    occurrences: tuple[Finding, ...]
    objective_breaches: tuple[Finding, ...]


def _is_excluded(path: Path) -> bool:
    return path.name in EXCLUDED_NAMES or bool(EXCLUDED_PARTS.intersection(path.parts)) or any(
        marker in path.name for marker in EXCLUDED_NAME_MARKERS
    )


def discover_public_sources(root: Path) -> tuple[Path, ...]:
    root = root.resolve()
    required_index = root / "src" / "client" / "index.html"
    required_source = root / "src" / "client" / "src"
    if not root.is_dir():
        raise SourceContractError(f"Public-language repository root does not exist: {root}")
    if not required_index.is_file() or not required_source.is_dir():
        raise SourceContractError(
            "Public-language root must contain src/client/index.html and src/client/src"
        )
    src_root = root / "src"
    if src_root.exists():
        unclassified = tuple(
            path
            for owner in src_root.iterdir()
            if owner.is_dir() and owner.name not in {"client", "server"}
            for path in owner.rglob("*")
            if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES
        )
        if unclassified:
            names = ", ".join(path.relative_to(root).as_posix() for path in sorted(unclassified))
            raise SourceContractError(f"Unclassified public source owner: {names}")
        unclassified_files = tuple(
            path
            for path in src_root.iterdir()
            if path.is_file()
            and path.suffix.lower() in TEXT_SUFFIXES
            and path.name not in NONPUBLIC_SRC_FILES
        )
        if unclassified_files:
            names = ", ".join(path.relative_to(root).as_posix() for path in sorted(unclassified_files))
            raise SourceContractError(f"Unclassified public source file: {names}")

    client_root = root / "src" / "client"
    classified_client_owners = {
        relative_owner.relative_to(Path("src/client")).parts[0]
        for _, relative_owner in PUBLIC_SOURCE_CLASSES
        if relative_owner != Path("src/client/index.html")
    }
    if client_root.exists():
        unclassified = tuple(
            path
            for owner in client_root.iterdir()
            if owner.is_dir()
            and owner.name not in classified_client_owners
            and owner.name not in NONPUBLIC_CLIENT_OWNERS
            for path in owner.rglob("*")
            if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES
        )
        if unclassified:
            names = ", ".join(path.relative_to(root).as_posix() for path in sorted(unclassified))
            raise SourceContractError(f"Unclassified client content owner: {names}")
        unclassified_files = tuple(
            path
            for path in client_root.iterdir()
            if path.is_file()
            and path.suffix.lower() in TEXT_SUFFIXES
            and path.name != "index.html"
            and path.name not in NONPUBLIC_CLIENT_FILES
        )
        if unclassified_files:
            names = ", ".join(path.relative_to(root).as_posix() for path in sorted(unclassified_files))
            raise SourceContractError(f"Unclassified client content file: {names}")

    sources: list[Path] = []
    for _, relative_owner in PUBLIC_SOURCE_CLASSES:
        owner = root / relative_owner
        candidates = (owner,) if owner.is_file() else owner.rglob("*") if owner.is_dir() else ()
        for path in candidates:
            if (
                path.is_file()
                and path.suffix.lower() in TEXT_SUFFIXES
                and not _is_excluded(path.relative_to(root))
            ):
                sources.append(path)
    return tuple(sorted(set(sources), key=lambda path: path.relative_to(root).as_posix()))


def _frontmatter(lines: list[str]) -> tuple[dict[str, str], set[int]]:
    if not lines or lines[0].strip() != "---":
        return {}, set()
    metadata: dict[str, str] = {}
    excluded = {1}
    for index, line in enumerate(lines[1:], start=2):
        excluded.add(index)
        if line.strip() == "---":
            return metadata, excluded
        if ":" in line:
            key, value = line.split(":", 1)
            metadata[key.strip()] = value.strip().strip('"\'')
    return {}, set()


def _paragraphs(lines: list[str], excluded_lines: set[int]) -> tuple[tuple[int, str], ...]:
    paragraphs: list[tuple[int, str]] = []
    current: list[str] = []
    start_line = 0
    for line_number, line in enumerate(lines, start=1):
        stripped = line.strip()
        boundary = line_number in excluded_lines or not stripped or stripped.startswith("#")
        if boundary:
            if current:
                paragraphs.append((start_line, " ".join(current)))
                current = []
            continue
        if not current:
            start_line = line_number
        current.append(stripped)
    if current:
        paragraphs.append((start_line, " ".join(current)))
    return tuple(paragraphs)


def _sentences(text: str) -> tuple[str, ...]:
    return tuple(sentence.strip() for sentence in SENTENCE_SPLIT_RE.split(text) if sentence.strip())


def _words(text: str) -> tuple[str, ...]:
    return tuple(match.group(0) for match in WORD_RE.finditer(text))


def _repeated_phrase_findings(
    relative_path: str,
    paragraphs: tuple[tuple[int, str], ...],
    phrase_words: int,
    first_seen: dict[tuple[str, ...], tuple[str, int, str]],
    emitted: set[tuple[tuple[str, ...], str]],
) -> tuple[Finding, ...]:
    if phrase_words < 2:
        raise ValueError("repeated_phrase_words must be at least 2")
    findings: list[Finding] = []
    for line, paragraph in paragraphs:
        words = tuple(word.lower() for word in _words(paragraph))
        for index in range(0, len(words) - phrase_words + 1):
            phrase = words[index : index + phrase_words]
            emission_key = (phrase, relative_path)
            if phrase in first_seen and emission_key not in emitted:
                first_path, first_line, _ = first_seen[phrase]
                findings.append(
                    Finding(
                        kind="repeated-exact-phrase",
                        path=relative_path,
                        line=line,
                        context=paragraph,
                        severity="observation",
                        evidence="heuristic",
                        term=" ".join(phrase),
                        related_path=first_path,
                        related_line=first_line,
                    )
                )
                emitted.add(emission_key)
            else:
                first_seen.setdefault(phrase, (relative_path, line, paragraph))
    return tuple(findings)


def audit_articles(root: Path, thresholds: AuditThresholds) -> CorpusReport:
    root = root.resolve()
    articles: list[ArticleObservation] = []
    findings: list[Finding] = []
    first_seen_phrases: dict[tuple[str, ...], tuple[str, int, str]] = {}
    emitted_phrases: set[tuple[tuple[str, ...], str]] = set()
    for path in sorted(root.rglob("*.md"), key=lambda item: item.relative_to(root).as_posix()):
        relative_path = path.relative_to(root).as_posix()
        lines = path.read_text(encoding="utf-8").splitlines()
        metadata, excluded_lines = _frontmatter(lines)
        headings = tuple(
            line.lstrip("#").strip()
            for number, line in enumerate(lines, start=1)
            if number not in excluded_lines and line.startswith("#")
        )
        paragraphs = _paragraphs(lines, excluded_lines)
        prose = "\n\n".join(paragraph for _, paragraph in paragraphs)
        sentences = tuple(sentence for _, paragraph in paragraphs for sentence in _sentences(paragraph))
        one_sentence_lines = tuple(line for line, paragraph in paragraphs if len(_sentences(paragraph)) == 1)
        observation = ArticleObservation(
            path=relative_path,
            prose=prose,
            word_count=len(_words(prose)),
            declared_reading_time=(
                metadata.get("readingTime")
                or metadata.get("reading_time")
                or (f"{metadata['readingMinutes']} min read" if metadata.get("readingMinutes") else None)
            ),
            headings=headings,
            paragraph_word_counts=tuple(len(_words(paragraph)) for _, paragraph in paragraphs),
            sentence_word_counts=tuple(len(_words(sentence)) for sentence in sentences),
            one_sentence_paragraph_lines=one_sentence_lines,
            links=tuple(LINK_RE.findall(prose)),
        )
        articles.append(observation)
        findings.extend(
            Finding(
                kind="one-sentence-paragraph",
                path=relative_path,
                line=line,
                context=paragraph,
                severity="observation",
                evidence="heuristic",
            )
            for line, paragraph in paragraphs
            if len(_sentences(paragraph)) == 1
        )
        findings.extend(
            _repeated_phrase_findings(
                relative_path,
                paragraphs,
                thresholds.repeated_phrase_words,
                first_seen_phrases,
                emitted_phrases,
            )
        )
    findings.sort(key=lambda finding: (finding.path, finding.line, finding.kind, finding.context))
    return CorpusReport(tuple(articles), tuple(findings))


def _term_pattern(term: str) -> re.Pattern[str]:
    return re.compile(rf"(?<![\w]){re.escape(term)}(?:s|ed|ing)?(?![\w])", re.IGNORECASE)


def audit_public_language(root: Path) -> LanguageReport:
    root = root.resolve()
    occurrences: list[Finding] = []
    for path in discover_public_sources(root):
        relative_path = path.relative_to(root).as_posix()
        for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
            for term in OBJECTIVE_TERMS + CONTEXTUAL_TERMS:
                severity: Literal["observation", "contextual-review"] = (
                    "observation" if term in OBJECTIVE_TERMS else "contextual-review"
                )
                for _ in _term_pattern(term).finditer(line):
                    occurrences.append(
                        Finding(
                            kind="public-language",
                            path=relative_path,
                            line=line_number,
                            context=line.strip(),
                            severity=severity,
                            term=term,
                        )
                    )
    occurrences.sort(key=lambda finding: (finding.path, finding.line, finding.term or ""))
    fuck_count = sum(finding.term == "fuck" for finding in occurrences)
    occurrences = [
        replace(finding, severity="objective-breach")
        if finding.term in {"cunt", "twat", "cock"}
        or (finding.term == "fuck" and fuck_count > 1)
        else finding
        for finding in occurrences
    ]
    breaches = tuple(
        finding
        for finding in occurrences
        if finding.severity == "objective-breach"
    )
    return LanguageReport(tuple(occurrences), breaches)


def _json_payload(value: object) -> object:
    if hasattr(value, "__dataclass_fields__"):
        return asdict(value)
    raise TypeError(f"Unsupported report value: {type(value).__name__}")


def render_language_report(report: LanguageReport, output_format: str) -> str:
    if output_format == "json":
        return json.dumps(_json_payload(report), indent=2, sort_keys=True)
    if not report.occurrences:
        return "No configured public-language terms found."
    return "\n".join(
        f"{finding.severity}: {finding.term} at {finding.path}:{finding.line} | {finding.context}"
        for finding in report.occurrences
    )


def render_corpus_report(report: CorpusReport, output_format: str) -> str:
    if output_format == "json":
        return json.dumps(_json_payload(report), indent=2, sort_keys=True)
    lines = [
        f"{article.path}: {article.word_count} words; reading time {article.declared_reading_time or 'not declared'}"
        for article in report.articles
    ]
    lines.extend(
        (
            f"{finding.evidence}: {finding.kind} at {finding.path}:{finding.line}"
            + (
                f"; '{finding.term}' first seen at {finding.related_path}:{finding.related_line}"
                if finding.related_path and finding.related_line
                else ""
            )
            + f" | {finding.context}"
        )
        for finding in report.findings
    )
    return "\n".join(lines) if lines else "No Markdown articles found."


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Report deterministic article observations or public-language findings without rewriting or scoring prose."
    )
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--articles", type=Path, help="Markdown article root to observe")
    mode.add_argument("--public-language", type=Path, help="Repository root whose explicit public sources are inventoried")
    parser.add_argument("--format", choices=("text", "json"), default="text")
    parser.add_argument("--check", action="store_true", help="Return non-zero only for objective language or source-contract breaches")
    parser.add_argument("--repeated-phrase-words", type=int, default=5, help="Visible exact n-gram threshold for observations")
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    try:
        if args.articles:
            report = audit_articles(args.articles, AuditThresholds(args.repeated_phrase_words))
            print(render_corpus_report(report, args.format))
            return 0
        report = audit_public_language(args.public_language)
        print(render_language_report(report, args.format))
        return 1 if args.check and report.objective_breaches else 0
    except (OSError, SourceContractError, ValueError) as error:
        print(f"audit error: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
