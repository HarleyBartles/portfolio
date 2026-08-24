from __future__ import annotations

import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW_PATH = ROOT / ".github/workflows/ci.yml"
PACKAGE_PATH = ROOT / "src/client/package.json"
VISUAL_SPEC_PATH = ROOT / "src/client/e2e/visual-regression.spec.ts"
PLAYWRIGHT_CONFIG_PATH = ROOT / "src/client/playwright.config.ts"


JOB_PREDICATE = "github.event_name != 'pull_request' || github.event.pull_request.draft == false"


def mapping_block(document: str, key: str, indent: int) -> str:
    lines = document.splitlines()
    header = f"{' ' * indent}{key}:"
    matches = [index for index, line in enumerate(lines) if line == header]
    if len(matches) != 1:
        raise AssertionError(f"expected one {header!r} mapping, found {len(matches)}")

    start = matches[0]
    end = len(lines)
    for index in range(start + 1, len(lines)):
        line = lines[index]
        if line and len(line) - len(line.lstrip()) <= indent:
            end = index
            break
    return "\n".join(lines[start:end])


def direct_scalar(document: str, key: str, indent: int) -> str:
    prefix = f"{' ' * indent}{key}: "
    values = [line.removeprefix(prefix) for line in document.splitlines() if line.startswith(prefix)]
    if len(values) != 1:
        raise AssertionError(f"expected one direct {key!r} field at indent {indent}, found {len(values)}")
    return values[0]


def sequence_values(document: str, key: str, indent: int) -> list[str]:
    lines = document.splitlines()
    header = f"{' ' * indent}{key}:"
    matches = [index for index, line in enumerate(lines) if line == header]
    if len(matches) != 1:
        raise AssertionError(f"expected one {header!r} sequence, found {len(matches)}")

    values: list[str] = []
    item_prefix = f"{' ' * (indent + 2)}- "
    for line in lines[matches[0] + 1:]:
        if line and len(line) - len(line.lstrip()) <= indent:
            break
        if line.startswith(item_prefix):
            values.append(line.removeprefix(item_prefix))
    return values


def step_blocks(job: str) -> list[str]:
    steps = mapping_block(job, "steps", 4)
    lines = steps.splitlines()[1:]
    starts = [index for index, line in enumerate(lines) if line.startswith("      - ")]
    if not starts:
        raise AssertionError("expected at least one workflow step")
    return ["\n".join(lines[start:end]) for start, end in zip(starts, starts[1:] + [len(lines)])]


def step_run_commands(job: str) -> list[str]:
    commands: list[str] = []
    for step in step_blocks(job):
        lines = step.splitlines()
        commands.extend(
            line.removeprefix("        run: ")
            for line in lines
            if line.startswith("        run: ")
        )
    return commands


class VisualCiContractTests(unittest.TestCase):
    def test_windows_is_the_required_canonical_visual_renderer(self) -> None:
        workflow = WORKFLOW_PATH.read_text(encoding="utf-8")
        package = json.loads(PACKAGE_PATH.read_text(encoding="utf-8"))
        visual_spec = VISUAL_SPEC_PATH.read_text(encoding="utf-8")
        playwright_config = PLAYWRIGHT_CONFIG_PATH.read_text(encoding="utf-8")

        triggers = mapping_block(workflow, "on", 0)
        pull_request = mapping_block(triggers, "pull_request", 2)
        jobs = mapping_block(workflow, "jobs", 0)
        quality = mapping_block(jobs, "quality", 2)
        visual = mapping_block(jobs, "visual-regression", 2)
        deploy = mapping_block(jobs, "deploy", 2)

        self.assertIn("synchronize", sequence_values(pull_request, "types", 4))
        self.assertIn("ready_for_review", sequence_values(pull_request, "types", 4))
        self.assertEqual("ubuntu-latest", direct_scalar(quality, "runs-on", 4))
        self.assertEqual(JOB_PREDICATE, direct_scalar(quality, "if", 4))
        self.assertIn("python3 tools/run.py ci --check --verbose", quality)
        self.assertEqual("windows-latest", direct_scalar(visual, "runs-on", 4))
        self.assertEqual(JOB_PREDICATE, direct_scalar(visual, "if", 4))
        self.assertIn("actions/checkout@v4", visual)
        self.assertIn("node-version: '24.x'", visual)
        self.assertIn("cache-dependency-path: src/client/package-lock.json", visual)
        self.assertEqual(
            [
                "npm ci --prefix src/client",
                "npx --prefix src/client playwright install chromium",
                "npm --prefix src/client run test:e2e:visual",
            ],
            step_run_commands(visual),
        )
        self.assertIn("name: playwright-visual-report-windows", visual)
        self.assertEqual(["quality", "visual-regression"], sequence_values(deploy, "needs", 4))

        self.assertEqual(
            "node scripts/run-e2e.mjs e2e/visual-regression.spec.ts",
            package["scripts"].get("test:e2e:visual"),
        )
        self.assertEqual("node scripts/run-e2e.mjs", package["scripts"].get("test:e2e"))
        self.assertIn("command: 'npm run preview:e2e'", playwright_config)
        self.assertNotIn("npm run build && npm run preview:e2e", playwright_config)
        self.assertIn("test.skip(process.platform !== 'win32'", visual_spec)
        self.assertNotIn("visualSnapshot", visual_spec)
        self.assertNotIn("-linux.png", visual_spec)


if __name__ == "__main__":
    unittest.main()
