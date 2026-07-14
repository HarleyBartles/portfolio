from __future__ import annotations

from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class CiPreflightWrapperTests(unittest.TestCase):
    def test_powershell_wrapper_routes_to_refresh_and_validation(self) -> None:
        text = (ROOT / "scripts" / "ci-preflight.ps1").read_text(encoding="utf-8")
        self.assertIn("refresh_agent_surfaces.ps1", text)
        self.assertIn("validate_agent_mesh.ps1", text)

    def test_bash_wrapper_routes_to_refresh_and_validation(self) -> None:
        text = (ROOT / "scripts" / "ci-preflight.sh").read_text(encoding="utf-8")
        self.assertIn("refresh_agent_surfaces.sh", text)
        self.assertIn("validate_agent_mesh.sh", text)


if __name__ == "__main__":
    unittest.main()
