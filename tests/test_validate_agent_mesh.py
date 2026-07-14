from __future__ import annotations

import importlib.util
import sys
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "validate_agent_mesh.py"


def load_module():
    spec = importlib.util.spec_from_file_location("validate_agent_mesh", SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load module from {SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class ValidateAgentMeshTests(unittest.TestCase):
    def test_check_mode_succeeds_when_doctrine_is_referenced(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            doctrine = root / ".agents" / "doctrine"
            doctrine.mkdir(parents=True)
            (doctrine / "policy.md").write_text("# policy\n", encoding="utf-8")
            (root / "INDEX.md").write_text("[policy](.agents/doctrine/policy.md)\n", encoding="utf-8")

            module.ROOT = root
            module.DOCTRINE_ROOT = doctrine

            stdout = StringIO()
            with redirect_stdout(stdout), unittest.mock.patch.object(
                sys,
                "argv",
                ["validate_agent_mesh.py", "--check"],
            ):
                result = module.main()

            self.assertEqual(result, 0)
            self.assertIn("OK doctrine mesh: 1 doctrine docs referenced from 1 mesh files", stdout.getvalue())


if __name__ == "__main__":
    unittest.main()
