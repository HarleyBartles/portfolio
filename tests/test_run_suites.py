from __future__ import annotations

import subprocess
import sys
import unittest
from pathlib import Path
from unittest.mock import call, patch

ROOT = Path(__file__).resolve().parents[1]
for import_root in (ROOT, ROOT / "tools"):
    if str(import_root) not in sys.path:
        sys.path.insert(0, str(import_root))

from tools import run  # noqa: E402


class SuiteCompositionTests(unittest.TestCase):
    def setUp(self) -> None:
        self.context = run.Ctx(mode="check", allow_shared=False)

    @patch.object(run, "_run")
    def test_base_ci_gate_runs_repository_and_client_product_checks(self, run_command) -> None:
        run._base_ci_check(self.context)

        commands = [entry.args[0] for entry in run_command.call_args_list]
        self.assertIn(run._content_manifest_cmd("check"), commands)
        self.assertIn(run._route_catalogue_cmd("check"), commands)
        self.assertIn(run._repository_validation_cmd(), commands)
        self.assertIn(run._tests_cmd(), commands)
        self.assertIn(run._client_unit_tests_cmd(), commands)
        self.assertIn(run._client_cmd("run", "build"), commands)

    @patch("shutil.which", return_value="C:/node/npm.cmd")
    def test_canonical_client_tests_retry_once_without_changing_focused_test_defaults(self, _which) -> None:
        self.assertEqual(
            [
                "C:/node/npm.cmd",
                "--prefix",
                "src/client",
                "test",
                "--",
                "--run",
                "--retry=1",
                "--reporter=verbose",
            ],
            run._client_unit_tests_cmd(),
        )
        self.assertEqual(
            [
                "C:/node/npm.cmd",
                "--prefix",
                "src/client",
                "run",
                "test:e2e",
                "--",
                "--skip-build",
                "--retries=1",
            ],
            run._client_e2e_cmd(),
        )

    @patch.object(run, "_run")
    def test_named_suite_targets_dispatch_independently(self, run_command) -> None:
        targets = {
            "repo-checks": (
                run._repository_checks_check,
                [
                    run._repo_standards_cmd("check", False),
                    run._refresh_skills_cmd("check", False),
                    run._content_manifest_cmd("check"),
                    run._route_catalogue_cmd("check"),
                ],
            ),
            "repository-validation": (
                run._repository_validation_check,
                [run._repository_validation_cmd()],
            ),
            "python-tests": (run._python_tests_check, [run._tests_cmd()]),
            "vitest-tests": (run._vitest_tests_check, [run._client_unit_tests_cmd()]),
            "production-build": (run._production_build_check, [run._client_cmd("run", "build")]),
            "playwright-tests": (run._playwright_tests_check, [run._client_e2e_cmd()]),
        }

        for target, (action, expected_commands) in targets.items():
            with self.subTest(target=target):
                run_command.reset_mock()
                action(self.context)
                self.assertEqual(
                    expected_commands,
                    [entry.args[0] for entry in run_command.call_args_list],
                )

    def test_named_suite_target_failure_becomes_a_nonzero_command_result(self) -> None:
        def fail(_context: run.Ctx) -> None:
            raise subprocess.CalledProcessError(7, ["suite"])

        target_map = dict(run.TARGETS)
        target_map["python-tests"] = {"check": fail}
        with patch.object(run, "TARGETS", target_map), patch.object(
            sys, "argv", ["tools/run.py", "python-tests", "--check"]
        ):
            self.assertEqual(1, run.main())

    @patch.object(run, "_run")
    @patch.object(run, "_base_ci_check")
    def test_complete_ci_adds_browser_journeys_after_fast_gate(
        self,
        base_ci_check,
        run_command,
    ) -> None:
        run._ci_check(self.context)

        base_ci_check.assert_called_once_with(self.context)
        self.assertEqual(
            [call(run._client_e2e_cmd(), self.context)],
            run_command.call_args_list,
        )

    @patch.object(run, "_run")
    def test_diagnostic_ci_reports_independent_failures_before_rejecting(self, run_command) -> None:
        diagnostic_context = run.Ctx(mode="check", allow_shared=False, diagnostics=True)
        failed_commands = {
            tuple(run._repo_standards_cmd("check", False)),
            tuple(run._repository_validation_cmd()),
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
        self.assertIn(run._tests_cmd(), commands)
        self.assertIn(run._client_unit_tests_cmd(), commands)
        self.assertNotIn(run._client_e2e_cmd(), commands)
        self.assertEqual(
            ["repository standards", "repository validation", "production build"],
            [result.name for result in raised.exception.failures],
        )
        self.assertEqual(
            "production build",
            raised.exception.skipped[0].blocked_by,
        )

    def test_precommit_is_not_a_separate_command_surface(self) -> None:
        self.assertNotIn("precommit", run.TARGETS)
        self.assertIn("ci", run.TARGETS)
