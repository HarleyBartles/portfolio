from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from tools.generate_content_manifest import build_manifest, refresh_manifest  # noqa: E402


class ContentManifestGenerationTests(unittest.TestCase):
    def test_builds_catalogue_from_markdown_frontmatter_and_colocated_metadata(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            content = root / "src/client/src/data/content"
            writing = content / "writing/2026-09-21-example-note.md"
            writing.parent.mkdir(parents=True)
            writing.write_text(
                """---
title: Example note
summary: A note whose catalogue metadata lives with the article.
readingMinutes: 3
tags: ["writing", "example"]
relatedSlugs: ["example-project"]
---

# Example note
""",
                encoding="utf-8",
            )
            page = root / "src/client/src/features/example/example-project.content.json"
            page.parent.mkdir(parents=True)
            page.write_text(
                json.dumps(
                    {
                        "slug": "example-project",
                        "kind": "project",
                        "title": "Example project",
                        "status": "live",
                        "summary": "A route-owned example project.",
                        "tags": ["project"],
                        "relatedSlugs": ["example-note"],
                    }
                ),
                encoding="utf-8",
            )

            manifest = build_manifest(root)

            self.assertEqual(
                manifest,
                {
                    "items": [
                        {
                            "slug": "example-project",
                            "kind": "project",
                            "title": "Example project",
                            "status": "live",
                            "summary": "A route-owned example project.",
                            "tags": ["project"],
                            "relatedSlugs": ["example-note"],
                        },
                        {
                            "slug": "example-note",
                            "kind": "writing",
                            "title": "Example note",
                            "date": "2026-09-21",
                            "readingMinutes": 3,
                            "status": "published",
                            "summary": "A note whose catalogue metadata lives with the article.",
                            "path": "writing/2026-09-21-example-note.md",
                            "tags": ["writing", "example"],
                            "relatedSlugs": ["example-project"],
                        },
                    ]
                },
            )
            self.assertNotIn("presentation", json.dumps(manifest))

    def test_check_rejects_stale_generated_manifest(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            page = root / "src/client/src/pages/example/example.content.json"
            page.parent.mkdir(parents=True)
            page.write_text(
                json.dumps(
                    {
                        "slug": "example",
                        "kind": "patch",
                        "title": "Example",
                        "status": "published",
                        "summary": "Generated catalogue fixture.",
                        "tags": ["patch"],
                        "relatedSlugs": [],
                    }
                ),
                encoding="utf-8",
            )
            output = root / "src/client/src/data/content/content-manifest.json"
            output.parent.mkdir(parents=True)
            output.write_text('{"items": []}\n', encoding="utf-8")

            with self.assertRaisesRegex(RuntimeError, "content-manifest.json is stale"):
                refresh_manifest(root, check=True)


if __name__ == "__main__":
    unittest.main()
