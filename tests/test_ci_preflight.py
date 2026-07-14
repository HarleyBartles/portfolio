from __future__ import annotations

import subprocess
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class CiPreflightWrapperTests(unittest.TestCase):
    def test_github_workflow_uses_non_marketplace_checks(self) -> None:
        text = (ROOT / ".github" / "workflows" / "ci.yml").read_text(encoding="utf-8")
        self.assertNotIn("AGENT_ASSET_MARKETPLACE_READ_TOKEN", text)
        self.assertNotIn("submodules: recursive", text)
        self.assertIn("generate_index_mesh.ps1 -Check", text)
        self.assertIn("validate_agent_mesh.ps1 -Check", text)
        self.assertIn("unittest discover -s tests -v", text)

    def test_powershell_wrapper_routes_to_refresh_and_validation(self) -> None:
        text = (ROOT / "scripts" / "ci-preflight.ps1").read_text(encoding="utf-8")
        self.assertIn("refresh_agent_surfaces.ps1", text)
        self.assertIn("validate_agent_mesh.ps1", text)
        self.assertIn("unittest discover -s tests -v", text)

    def test_bash_wrapper_routes_to_refresh_and_validation(self) -> None:
        text = (ROOT / "scripts" / "ci-preflight.sh").read_text(encoding="utf-8")
        self.assertIn("refresh_agent_surfaces.sh", text)
        self.assertIn("validate_agent_mesh.sh", text)
        self.assertIn("unittest discover -s tests -v", text)

    def test_bash_wrapper_rejects_unknown_arguments(self) -> None:
        result = subprocess.run(
            ["bash", str(ROOT / "scripts" / "ci-preflight.sh"), "--bogus"],
            cwd=ROOT,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False,
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Unknown argument: --bogus", result.stderr)


if __name__ == "__main__":
    unittest.main()
