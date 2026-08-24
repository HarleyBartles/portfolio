from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from tools import check_link_hygiene


class LinkHygieneTests(unittest.TestCase):
    def test_raw_external_and_new_tab_anchors_must_use_the_accessible_component(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            source_root = Path(directory)
            (source_root / "Example.tsx").write_text(
                '<a href="https://example.test" target="_blank">Evidence</a>',
                encoding="utf-8",
            )
            errors: list[str] = []

            check_link_hygiene.check_jsx_anchors(errors, source_root)

            self.assertTrue(any("raw external anchor" in error for error in errors))
            self.assertTrue(any("raw new-tab anchor" in error for error in errors))

    def test_internal_anchors_keep_the_current_browsing_context(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            source_root = Path(directory)
            (source_root / "Example.tsx").write_text(
                '<a href="#evidence">Evidence</a>',
                encoding="utf-8",
            )
            errors: list[str] = []

            check_link_hygiene.check_jsx_anchors(errors, source_root)

            self.assertEqual([], errors)

    def test_external_link_component_contract_is_complete(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            source_root = Path(directory)
            components = source_root / "components"
            components.mkdir()
            (components / "ExternalLink.tsx").write_text('export function ExternalLink() {}', encoding="utf-8")
            errors: list[str] = []

            check_link_hygiene.check_external_link_contract(errors, source_root)

            self.assertEqual(6, len(errors))


if __name__ == "__main__":
    unittest.main()
