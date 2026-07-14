from __future__ import annotations

import importlib.util
import io
import os
import subprocess
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch
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
    def test_check_mode_reports_drift_without_running_later_steps(self) -> None:
        module = load_module()
        calls: list[list[str]] = []

        def fake_run(args: list[str], **_kwargs: object) -> subprocess.CompletedProcess[str]:
            calls.append(args)
            if args[-1] == "--check" and "generate_index_mesh.py" in args[1]:
                return subprocess.CompletedProcess(args, 1, "", "mesh drift\n")
            return subprocess.CompletedProcess(args, 0, "", "")

        stdout = io.StringIO()
        stderr = io.StringIO()

        with patch.object(module, "ROOT", ROOT), patch.object(sys, "argv", ["refresh_agent_surfaces.py", "--check"]):
            result = module.main(stdout=stdout, stderr=stderr, runner=fake_run)

        self.assertEqual(result, 1)
        self.assertEqual(len(calls), 1)
        self.assertIn("generate_index_mesh.py", calls[0][1])
        self.assertIn("--check", calls[0])
        self.assertIn("index mesh", stderr.getvalue())
        self.assertIn("drift", stderr.getvalue())

    def test_normal_execution_runs_mesh_before_skills(self) -> None:
        module = load_module()
        calls: list[list[str]] = []

        def fake_run(args: list[str], **_kwargs: object) -> subprocess.CompletedProcess[str]:
            calls.append(args)
            return subprocess.CompletedProcess(args, 0, "", "")

        stdout = io.StringIO()
        stderr = io.StringIO()

        with patch.object(module, "ROOT", ROOT), patch.object(sys, "argv", ["refresh_agent_surfaces.py"]):
            result = module.main(stdout=stdout, stderr=stderr, runner=fake_run)

        self.assertEqual(result, 0)
        self.assertEqual(
            [Path(call[1]).name for call in calls],
            ["generate_index_mesh.py", "install_agent_skills.py"],
        )
        self.assertTrue(all("--check" not in call for call in calls))
        self.assertIn("index mesh", stdout.getvalue())
        self.assertIn("agent skills", stdout.getvalue())

    def test_reports_which_surface_failed(self) -> None:
        module = load_module()

        def fake_run(args: list[str], **_kwargs: object) -> subprocess.CompletedProcess[str]:
            if "install_agent_skills.py" in args[1]:
                return subprocess.CompletedProcess(args, 9, "", "skills stale\n")
            return subprocess.CompletedProcess(args, 0, "", "")

        stdout = io.StringIO()
        stderr = io.StringIO()

        with patch.object(module, "ROOT", ROOT), patch.object(sys, "argv", ["refresh_agent_surfaces.py"]):
            result = module.main(stdout=stdout, stderr=stderr, runner=fake_run)

        self.assertEqual(result, 9)
        self.assertIn("agent skills", stderr.getvalue())
        self.assertIn("exit code 9", stderr.getvalue())

    def test_powershell_wrapper_passes_check_flag_to_python_core(self) -> None:
        wrapper_source = ROOT / "scripts" / "refresh_agent_surfaces.ps1"
        self.assertTrue(wrapper_source.exists(), f"Missing wrapper: {wrapper_source}")

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            scripts_dir = temp / "scripts"
            scripts_dir.mkdir()

            wrapper_copy = scripts_dir / "refresh_agent_surfaces.ps1"
            wrapper_copy.write_text(wrapper_source.read_text(encoding="utf-8"), encoding="utf-8")

            output_path = temp / "ps-args.txt"
            stub_core = scripts_dir / "refresh_agent_surfaces.py"
            stub_core.write_text(
                "import os\n"
                "import sys\n"
                "from pathlib import Path\n"
                "Path(os.environ['OUTPUT_PATH']).write_text('|'.join(sys.argv[1:]), encoding='utf-8')\n",
                encoding="utf-8",
            )

            result = subprocess.run(
                [
                    "powershell",
                    "-NoProfile",
                    "-File",
                    str(wrapper_copy),
                    "-Check",
                ],
                cwd=temp,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env={**os.environ, "OUTPUT_PATH": str(output_path)},
                check=False,
            )

            self.assertEqual(result.returncode, 0, msg=result.stderr)
            self.assertEqual(output_path.read_text(encoding="utf-8"), "--check")

    def test_bash_wrapper_passes_check_flag_to_python_core(self) -> None:
        wrapper_source = ROOT / "scripts" / "refresh_agent_surfaces.sh"
        self.assertTrue(wrapper_source.exists(), f"Missing wrapper: {wrapper_source}")

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            scripts_dir = temp / "scripts"
            scripts_dir.mkdir()

            wrapper_copy = scripts_dir / "refresh_agent_surfaces.sh"
            wrapper_copy.write_text(wrapper_source.read_text(encoding="utf-8"), encoding="utf-8")

            output_path = temp / "sh-args.txt"
            stub_core = scripts_dir / "refresh_agent_surfaces.py"
            stub_core.write_text(
                "import os\n"
                "import sys\n"
                "from pathlib import Path\n"
                "Path(os.environ['OUTPUT_PATH']).write_text('|'.join(sys.argv[1:]), encoding='utf-8')\n",
                encoding="utf-8",
            )

            result = subprocess.run(
                ["bash", str(wrapper_copy), "--check"],
                cwd=temp,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env={**os.environ, "OUTPUT_PATH": str(output_path)},
                check=False,
            )

            self.assertEqual(result.returncode, 0, msg=result.stderr)
            self.assertEqual(output_path.read_text(encoding="utf-8"), "--check")


if __name__ == "__main__":
    unittest.main()
