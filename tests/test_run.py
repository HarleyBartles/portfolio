from __future__ import annotations

import sys
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
        self.assertIn(run._tests_cmd(), commands)
        self.assertIn(run._client_cmd("test", "--", "--run"), commands)
        self.assertIn(run._client_cmd("run", "build"), commands)

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


if __name__ == "__main__":
    unittest.main()
