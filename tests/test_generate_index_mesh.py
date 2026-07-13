from __future__ import annotations

import importlib.util
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "generate_index_mesh.py"


def load_module():
    spec = importlib.util.spec_from_file_location("generate_index_mesh", SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load module from {SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


class GenerateIndexMeshTests(unittest.TestCase):
    def test_gitignored_directory_is_not_descended_into(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            root.mkdir()
            ignored = root / "ignored"
            ignored.mkdir()
            (ignored / ".git").write_text("gitdir: ../.git/modules/ignored\n", encoding="utf-8")
            (ignored / "child.txt").write_text("hidden\n", encoding="utf-8")

            module.ROOT = root
            module.GITIGNORED_PATHS = set()

            self.assertFalse(module.should_descend(ignored))
            self.assertFalse(module.should_index(ignored))

    def test_gitignored_path_is_not_descended_into(self) -> None:
        module = load_module()

        with TemporaryDirectory() as temp_dir:
            temp = Path(temp_dir)
            root = temp / "repo"
            root.mkdir()
            target = root / "generated"
            target.mkdir()

            module.ROOT = root
            module.GITIGNORED_PATHS = {"generated"}

            self.assertFalse(module.should_descend(target))
            self.assertFalse(module.should_index(target))


if __name__ == "__main__":
    unittest.main()
