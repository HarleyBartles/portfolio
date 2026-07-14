from __future__ import annotations

import os
import subprocess
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "ci-preflight.ps1"
SCRIPT_SH = ROOT / "scripts" / "ci-preflight.sh"


class CiPreflightTests(unittest.TestCase):
    def test_check_mode_runs_refresh_then_validate(self) -> None:
        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            scripts_dir = temp / "scripts"
            scripts_dir.mkdir()

            (scripts_dir / "ci-preflight.ps1").write_text(
                SCRIPT.read_text(encoding="utf-8"),
                encoding="utf-8",
            )
            self._write_stub(
                scripts_dir / "refresh_agent_surfaces.ps1",
                "refresh",
                exit_code=0,
            )
            self._write_stub(
                scripts_dir / "validate_agent_mesh.ps1",
                "validate",
                exit_code=0,
            )

            output_path = temp / "calls.txt"
            result = subprocess.run(
                [
                    "powershell",
                    "-NoProfile",
                    "-File",
                    str(scripts_dir / "ci-preflight.ps1"),
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
            self.assertEqual(
                output_path.read_text(encoding="utf-8").splitlines(),
                [
                    "refresh:-Check=True",
                    "validate:-Check=True",
                ],
            )

    def test_non_check_mode_uses_same_readiness_steps(self) -> None:
        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            scripts_dir = temp / "scripts"
            scripts_dir.mkdir()

            (scripts_dir / "ci-preflight.ps1").write_text(
                SCRIPT.read_text(encoding="utf-8"),
                encoding="utf-8",
            )
            self._write_stub(
                scripts_dir / "refresh_agent_surfaces.ps1",
                "refresh",
                exit_code=0,
            )
            self._write_stub(
                scripts_dir / "validate_agent_mesh.ps1",
                "validate",
                exit_code=0,
            )

            output_path = temp / "calls.txt"
            result = subprocess.run(
                [
                    "powershell",
                    "-NoProfile",
                    "-File",
                    str(scripts_dir / "ci-preflight.ps1"),
                ],
                cwd=temp,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env={**os.environ, "OUTPUT_PATH": str(output_path)},
                check=False,
            )

            self.assertEqual(result.returncode, 0, msg=result.stderr)
            self.assertEqual(
                output_path.read_text(encoding="utf-8").splitlines(),
                [
                    "refresh:-Check=False",
                    "validate:-Check=False",
                ],
            )

    def test_stops_on_first_failure(self) -> None:
        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            scripts_dir = temp / "scripts"
            scripts_dir.mkdir()

            (scripts_dir / "ci-preflight.ps1").write_text(
                SCRIPT.read_text(encoding="utf-8"),
                encoding="utf-8",
            )
            self._write_stub(
                scripts_dir / "refresh_agent_surfaces.ps1",
                "refresh",
                exit_code=7,
            )
            self._write_stub(
                scripts_dir / "validate_agent_mesh.ps1",
                "validate",
                exit_code=0,
            )

            output_path = temp / "calls.txt"
            result = subprocess.run(
                [
                    "powershell",
                    "-NoProfile",
                    "-File",
                    str(scripts_dir / "ci-preflight.ps1"),
                    "-Check",
                ],
                cwd=temp,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env={**os.environ, "OUTPUT_PATH": str(output_path)},
                check=False,
            )

            self.assertEqual(result.returncode, 7, msg=result.stderr)
            self.assertEqual(
                output_path.read_text(encoding="utf-8").splitlines(),
                ["refresh:-Check=True"],
            )

    def test_bash_check_mode_runs_refresh_then_validate(self) -> None:
        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            scripts_dir = temp / "scripts"
            scripts_dir.mkdir()

            (scripts_dir / "ci-preflight.sh").write_text(
                SCRIPT_SH.read_text(encoding="utf-8"),
                encoding="utf-8",
            )
            self._write_bash_stub(
                scripts_dir / "refresh_agent_surfaces.sh",
                "refresh",
                exit_code=0,
            )
            self._write_bash_stub(
                scripts_dir / "validate_agent_mesh.sh",
                "validate",
                exit_code=0,
            )

            output_path = temp / "calls.txt"
            result = subprocess.run(
                [
                    "bash",
                    str(scripts_dir / "ci-preflight.sh"),
                    "--check",
                ],
                cwd=temp,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env={**os.environ, "OUTPUT_PATH": str(output_path)},
                check=False,
            )

            self.assertEqual(result.returncode, 0, msg=result.stderr)
            self.assertEqual(
                output_path.read_text(encoding="utf-8").splitlines(),
                [
                    "refresh:--check",
                    "validate:--check",
                ],
            )

    def test_bash_stops_on_first_failure(self) -> None:
        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            scripts_dir = temp / "scripts"
            scripts_dir.mkdir()

            (scripts_dir / "ci-preflight.sh").write_text(
                SCRIPT_SH.read_text(encoding="utf-8"),
                encoding="utf-8",
            )
            self._write_bash_stub(
                scripts_dir / "refresh_agent_surfaces.sh",
                "refresh",
                exit_code=7,
            )
            self._write_bash_stub(
                scripts_dir / "validate_agent_mesh.sh",
                "validate",
                exit_code=0,
            )

            output_path = temp / "calls.txt"
            result = subprocess.run(
                [
                    "bash",
                    str(scripts_dir / "ci-preflight.sh"),
                    "--check",
                ],
                cwd=temp,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env={**os.environ, "OUTPUT_PATH": str(output_path)},
                check=False,
            )

            self.assertEqual(result.returncode, 7, msg=result.stderr)
            self.assertEqual(
                output_path.read_text(encoding="utf-8").splitlines(),
                ["refresh:--check"],
            )

    def _write_stub(self, path: Path, name: str, *, exit_code: int) -> None:
        path.write_text(
            "\n".join(
                [
                    "param([switch]$Check)",
                    "$outputPath = $env:OUTPUT_PATH",
                    'Add-Content -Path $outputPath -Value ("'
                    + name
                    + ':'
                    + '-Check=$Check")',
                    f"exit {exit_code}",
                    "",
                ]
            ),
            encoding="utf-8",
        )

    def _write_bash_stub(self, path: Path, name: str, *, exit_code: int) -> None:
        path.write_text(
            "\n".join(
                [
                    "#!/usr/bin/env bash",
                    "set -euo pipefail",
                    'printf "%s\\n" "'
                    + name
                    + ':${1:-}" >> "$OUTPUT_PATH"',
                    f"exit {exit_code}",
                    "",
                ]
            ),
            encoding="utf-8",
        )


if __name__ == "__main__":
    unittest.main()
