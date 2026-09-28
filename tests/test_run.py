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
    def test_ci_apply_regenerates_owned_content_and_route_projections(self, run_command) -> None:
        apply_context = run.Ctx(mode="apply", allow_shared=False)

        run._ci_apply(apply_context)

        commands = [entry.args[0] for entry in run_command.call_args_list]
        self.assertIn(run._content_manifest_cmd("apply"), commands)
        self.assertIn(run._content_manifest_cmd("check"), commands)
        self.assertIn(run._route_catalogue_cmd("apply"), commands)
        self.assertIn(run._route_catalogue_cmd("check"), commands)
        self.assertIn(run._refresh_seo_files_cmd(), commands)




    @patch.dict("os.environ", {"REPO_STANDARDS_HOSTED_COMMIT": ""})
    def test_standard_skill_refresh_target_uses_the_bundled_implementation(self) -> None:
        self.assertEqual(
            [
                sys.executable,
                ".agents/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py",
                "--check",
            ],
            run._refresh_skills_cmd("check", False),
        )

    @patch.dict("os.environ", {"REPO_STANDARDS_HOSTED_COMMIT": "HEAD"})
    def test_hosted_skill_refresh_uses_the_committed_marketplace_source(self) -> None:
        self.assertEqual(
            [
                sys.executable,
                ".agents/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py",
                "--check",
                "--no-roll-marketplace-source",
            ],
            run._refresh_skills_cmd("check", False),
        )
        self.assertEqual(
            [
                sys.executable,
                ".agents/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py",
                "--apply",
                "--no-roll-marketplace-source",
            ],
            run._refresh_skills_cmd("apply", False),
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
                repo / "githooks/pre-commit",
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
            self.assertFalse((repo / "githooks/INDEX.md").exists())
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
        run._base_ci_check(self.context)

        commands = [entry.args[0] for entry in run_command.call_args_list]
        self.assertIn(run._repo_standards_cmd("check", False), commands)
        self.assertIn(run._skills_cmd("check", False), commands)
        self.assertIn(run._mesh_validate_cmd(), commands)





if __name__ == "__main__":
    unittest.main()
