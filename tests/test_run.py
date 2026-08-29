from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import call, patch


ROOT = Path(__file__).resolve().parents[1]
for import_root in (ROOT, ROOT / "tools"):
    if str(import_root) not in sys.path:
        sys.path.insert(0, str(import_root))

from tools import run  # noqa: E402


class CanonicalRunnerTests(unittest.TestCase):
    def setUp(self) -> None:
        self.context = run.Ctx(mode="check", allow_shared=False)

    @patch("shutil.which", return_value="C:/node/npm.cmd")
    def test_client_commands_use_the_resolved_npm_executable(self, _which) -> None:
        self.assertEqual(
            ["C:/node/npm.cmd", "--prefix", "src/client", "run", "build"],
            run._client_cmd("run", "build"),
        )

    @patch.object(run, "_run")
    def test_precommit_gate_runs_repository_and_client_product_checks(self, run_command) -> None:
        run._precommit_check(self.context)

        commands = [entry.args[0] for entry in run_command.call_args_list]
        self.assertIn(run._link_hygiene_check_cmd(), commands)
        self.assertIn(run._portfolio_quality_check_cmd(), commands)
        self.assertIn(run._tests_cmd(), commands)
        self.assertIn(run._client_cmd("test", "--", "--run"), commands)
        self.assertIn(run._client_cmd("run", "build"), commands)

    def test_standard_skill_refresh_target_uses_the_bundled_implementation(self) -> None:
        self.assertEqual(
            [
                sys.executable,
                ".agents/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py",
                "--check",
            ],
            run._refresh_skills_cmd("check", False),
        )

    @patch("shutil.which", return_value="C:/node/npm.cmd")
    def test_install_deps_apply_uses_the_client_lockfile(self, _which) -> None:
        self.assertEqual(
            ["C:/node/npm.cmd", "--prefix", "src/client", "ci"],
            run._install_deps_cmd("apply"),
        )

    @patch("shutil.which", return_value="C:/node/npm.cmd")
    def test_install_deps_check_validates_the_installed_client_tree(self, _which) -> None:
        self.assertEqual(
            ["C:/node/npm.cmd", "--prefix", "src/client", "ls", "--depth=0"],
            run._install_deps_cmd("check"),
        )

    @patch.object(run, "_run")
    def test_install_deps_target_dispatches_by_mode(self, run_command) -> None:
        apply_context = run.Ctx(mode="apply", allow_shared=False)

        run.TARGETS["install-deps"]["apply"](apply_context)
        run.TARGETS["install-deps"]["check"](self.context)

        self.assertEqual(
            [
                call(run._install_deps_cmd("apply"), apply_context),
                call(run._install_deps_cmd("check"), self.context),
            ],
            run_command.call_args_list,
        )

    def test_portfolio_index_mesh_target_uses_bundled_code_with_local_policy(self) -> None:
        self.assertEqual(
            [
                sys.executable,
                ".agents/skills/generating-agent-mesh/scripts/generate_index_mesh.py",
                "--check",
                "--exclusions",
                "tools/index_mesh_exclusions.json",
            ],
            run._index_mesh_cmd("check", False),
        )

    @patch.object(run, "_run")
    def test_mesh_composes_the_standard_index_target_and_validation(self, run_command) -> None:
        run._mesh_check(self.context)

        self.assertEqual(
            [
                call(run._index_mesh_cmd("check", False), self.context),
                call(run._mesh_validate_cmd(), self.context),
            ],
            run_command.call_args_list,
        )

    def test_portfolio_mesh_policy_excludes_noncanonical_generated_surfaces(self) -> None:
        generator = ROOT / ".agents/skills/generating-agent-mesh/scripts/generate_index_mesh.py"
        exclusions = ROOT / "tools/index_mesh_exclusions.json"

        with tempfile.TemporaryDirectory() as tmp:
            repo = Path(tmp)
            tracked = (
                repo / ".githooks/pre-commit",
                repo / "src/client/public/media/hero.png",
                repo / "src/client/src/data/content/project.md",
                repo / "docs/guide.md",
            )
            for path in tracked:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("fixture\n", encoding="utf-8")
            subprocess.run(["git", "init", "-q"], cwd=repo, check=True)
            subprocess.run(["git", "add", "."], cwd=repo, check=True)

            result = subprocess.run(
                [
                    sys.executable,
                    str(generator),
                    "--apply",
                    "--repo-root",
                    str(repo),
                    "--exclusions",
                    str(exclusions),
                ],
                cwd=repo,
                capture_output=True,
                text=True,
            )

            self.assertEqual(0, result.returncode, result.stdout + result.stderr)
            self.assertTrue((repo / "docs/INDEX.md").is_file())
            self.assertFalse((repo / ".githooks/INDEX.md").exists())
            self.assertFalse((repo / "src/client/public/INDEX.md").exists())
            self.assertFalse((repo / "src/client/src/data/content/INDEX.md").exists())

    def test_playwright_mcp_diagnostics_do_not_dirty_the_checkout(self) -> None:
        result = subprocess.run(
            ["git", "check-ignore", "-q", ".playwright-mcp/session.yml"],
            cwd=ROOT,
        )

        self.assertEqual(0, result.returncode)

    @patch.dict("os.environ", {"GITHUB_ACTIONS": "true"})
    @patch.object(run, "_run")
    def test_gate_checks_public_marketplace_source_and_derived_projection(self, run_command) -> None:
        run._precommit_check(self.context)

        commands = [entry.args[0] for entry in run_command.call_args_list]
        self.assertIn(run._repo_standards_cmd("check", False), commands)
        self.assertIn(run._skills_cmd("check", False), commands)
        self.assertIn(run._mesh_validate_cmd(), commands)

    @patch.object(run, "_run")
    @patch.object(run, "_precommit_check")
    def test_complete_ci_adds_browser_journeys_after_fast_gate(
        self,
        precommit_check,
        run_command,
    ) -> None:
        run._ci_check(self.context)

        precommit_check.assert_called_once_with(self.context)
        self.assertEqual(
            [call(run._client_cmd("run", "test:e2e"), self.context)],
            run_command.call_args_list,
        )

    @patch.object(run, "_run")
    def test_diagnostic_ci_reports_independent_failures_before_rejecting(self, run_command) -> None:
        diagnostic_context = run.Ctx(mode="check", allow_shared=False, diagnostics=True)
        failed_commands = {
            tuple(run._repo_standards_cmd("check", False)),
            tuple(run._link_hygiene_check_cmd()),
            tuple(run._client_cmd("run", "build")),
        }

        def run_with_failures(command: list[str], _ctx: run.Ctx) -> None:
            if tuple(command) in failed_commands:
                raise subprocess.CalledProcessError(1, command)

        run_command.side_effect = run_with_failures

        with self.assertRaises(run.DiagnosticCheckError) as raised:
            run._ci_check(diagnostic_context)

        commands = [entry.args[0] for entry in run_command.call_args_list]
        self.assertIn(run._skills_cmd("check", False), commands)
        self.assertIn(run._mesh_validate_cmd(), commands)
        self.assertIn(run._portfolio_quality_check_cmd(), commands)
        self.assertIn(run._tests_cmd(), commands)
        self.assertIn(run._client_cmd("test", "--", "--run"), commands)
        self.assertNotIn(run._client_cmd("run", "test:e2e"), commands)
        self.assertEqual(
            ["repository standards", "link hygiene", "production build"],
            [result.name for result in raised.exception.failures],
        )
        self.assertEqual(
            "production build",
            raised.exception.skipped[0].blocked_by,
        )


if __name__ == "__main__":
    unittest.main()
