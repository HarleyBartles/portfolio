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
        self.assertTrue(all("repo_standards.py" not in " ".join(command) for command in commands))
        self.assertTrue(all("refresh_installed_skills.py" not in " ".join(command) for command in commands))




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
    def test_gate_checks_repository_owned_agent_assets(self, run_command) -> None:
        run._base_ci_check(self.context)

        commands = [entry.args[0] for entry in run_command.call_args_list]
        self.assertEqual(run._repository_asset_check_commands(), commands[:4])





if __name__ == "__main__":
    unittest.main()
