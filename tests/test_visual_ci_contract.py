from __future__ import annotations

import json
import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW_PATH = ROOT / ".github/workflows/ci.yml"
PACKAGE_PATH = ROOT / "src/client/package.json"
VISUAL_SPEC_PATH = ROOT / "src/client/e2e/visual-regression.spec.ts"


def job_block(workflow: str, name: str) -> str:
    match = re.search(
        rf"(?ms)^  {re.escape(name)}:\n(.*?)(?=^  [A-Za-z][A-Za-z0-9_-]*:\n|\Z)",
        workflow,
    )
    if match is None:
        raise AssertionError(f"workflow is missing the {name!r} job")
    return match.group(0)


class VisualCiContractTests(unittest.TestCase):
    def test_windows_is_the_required_canonical_visual_renderer(self) -> None:
        workflow = WORKFLOW_PATH.read_text(encoding="utf-8")
        package = json.loads(PACKAGE_PATH.read_text(encoding="utf-8"))
        visual_spec = VISUAL_SPEC_PATH.read_text(encoding="utf-8")

        quality = job_block(workflow, "quality")
        visual = job_block(workflow, "visual-regression")
        deploy = job_block(workflow, "deploy")

        self.assertIn("runs-on: ubuntu-latest", quality)
        self.assertIn("python3 tools/run.py ci --check --verbose", quality)
        self.assertIn("runs-on: windows-latest", visual)
        self.assertNotRegex(visual, r"(?m)^    if:")
        self.assertIn("actions/checkout@v4", visual)
        self.assertIn("node-version: '24.x'", visual)
        self.assertIn("cache-dependency-path: src/client/package-lock.json", visual)
        self.assertIn("npm ci --prefix src/client", visual)
        self.assertIn("npx --prefix src/client playwright install chromium", visual)
        self.assertIn("npm --prefix src/client run test:e2e:visual", visual)
        self.assertNotIn("tools/run.py ci", visual)
        self.assertIn("name: playwright-visual-report-windows", visual)
        self.assertRegex(deploy, r"(?m)^    needs:\n      - quality\n      - visual-regression\n")

        self.assertEqual(
            "playwright test e2e/visual-regression.spec.ts",
            package["scripts"].get("test:e2e:visual"),
        )
        self.assertIn("test.skip(process.platform !== 'win32'", visual_spec)
        self.assertNotIn("visualSnapshot", visual_spec)
        self.assertNotIn("-linux.png", visual_spec)


if __name__ == "__main__":
    unittest.main()
