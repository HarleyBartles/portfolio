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




    def test_repo_standards_uses_the_deployed_consumer_dispatcher(self) -> None:
        self.assertEqual(
            [
                sys.executable,
                ".agents/standards/_runtime/repo_standards.py",
                "--check",
            ],
            run._repo_standards_cmd("check", False),
        )

    def test_skill_refresh_always_uses_the_pinned_submodule_utility(self) -> None:
        self.assertEqual(
            [
                sys.executable,
                ".agents/plugins/marketplace-source/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py",
                "--check",
                "--no-roll-marketplace-source",
            ],
            run._refresh_skills_cmd("check", False),
        )
        self.assertEqual(
            [
                sys.executable,
                ".agents/plugins/marketplace-source/skills/refreshing-installed-skills/scripts/refresh_installed_skills.py",
                "--apply",
                "--allow-shared-checkout",
                "--no-roll-marketplace-source",
            ],
            run._refresh_skills_cmd("apply", True),
        )

    def test_refresh_bridge_exposes_only_the_pinned_deployer_temporarily(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source_script = (
                root
                / ".agents/plugins/marketplace-source/skills/repo-shape/scripts/deploy_vendor_profiles.py"
            )
            source_script.parent.mkdir(parents=True)
            source_script.write_text("print('pinned')\n", encoding="utf-8")
            observed = []

            def inspect_bridge(command, context):
                bridge = root / "skills/repo-shape/scripts/deploy_vendor_profiles.py"
                observed.append((bridge.read_text(encoding="utf-8"), command, context))
            with (
                patch.object(run, "ROOT", root),
                patch.object(run, "_run", side_effect=inspect_bridge) as run_command,
            ):
                run._run_refresh_skills("check", self.context)
            self.assertEqual("print('pinned')\n", observed[0][0])
            self.assertEqual(run._refresh_skills_cmd("check", False), observed[0][1])
            self.assertIs(self.context, observed[0][2])
            run_command.assert_called_once()
            self.assertFalse((root / "skills").exists())

    def test_refresh_bridge_is_cleaned_when_the_refresh_fails(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source_script = (
                root
                / ".agents/plugins/marketplace-source/skills/repo-shape/scripts/deploy_vendor_profiles.py"
            )
            source_script.parent.mkdir(parents=True)
            source_script.write_text("print('pinned')\n", encoding="utf-8")
            with (
                patch.object(run, "ROOT", root),
                patch.object(run, "_run", side_effect=RuntimeError("refresh failed")),
            ):
                with self.assertRaisesRegex(RuntimeError, "refresh failed"):
                    run._run_refresh_skills("apply", self.context)
            self.assertFalse((root / "skills").exists())

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





if __name__ == "__main__":
    unittest.main()
