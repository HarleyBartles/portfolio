from __future__ import annotations

import importlib.util
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import Mock, patch
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "refresh_agent_surfaces.py"


def load_module():
    spec = importlib.util.spec_from_file_location("refresh_agent_surfaces", SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load module from {SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class RefreshAgentSurfacesTests(unittest.TestCase):
    def test_check_mode_runs_all_steps_with_check(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            first = temp / "first.py"
            second = temp / "second.py"
            first.write_text("", encoding="utf-8")
            second.write_text("", encoding="utf-8")

            module.ROOT = temp
            module.REFRESH_STEPS = (
                module.RefreshStep(name="first", script=first),
                module.RefreshStep(name="second", script=second),
            )
            calls = []

            def fake_run(command, cwd, check):  # type: ignore[no-untyped-def]
                calls.append(command)
                return Mock(returncode=0)

            with patch.object(module.subprocess, "run", side_effect=fake_run):
                module.run_refresh(check=True)

            self.assertEqual(
                calls,
                [
                    [sys.executable, str(first), "--check"],
                    [sys.executable, str(second), "--check"],
                ],
            )

    def test_write_mode_runs_all_steps_without_check(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            first = temp / "first.py"
            second = temp / "second.py"
            first.write_text("", encoding="utf-8")
            second.write_text("", encoding="utf-8")

            module.ROOT = temp
            module.REFRESH_STEPS = (
                module.RefreshStep(name="first", script=first),
                module.RefreshStep(name="second", script=second),
            )
            calls = []

            def fake_run(command, cwd, check):  # type: ignore[no-untyped-def]
                calls.append(command)
                return Mock(returncode=0)

            with patch.object(module.subprocess, "run", side_effect=fake_run):
                module.run_refresh(check=False)

            self.assertEqual(
                calls,
                [
                    [sys.executable, str(first)],
                    [sys.executable, str(second)],
                ],
            )

    def test_main_reports_refresh_summary(self) -> None:
        module = load_module()

        with patch.object(module, "run_refresh") as run_refresh:
            with patch.object(sys, "argv", ["refresh_agent_surfaces.py", "--check"]):
                result = module.main()

        self.assertEqual(result, 0)
        run_refresh.assert_called_once_with(check=True)


if __name__ == "__main__":
    unittest.main()
