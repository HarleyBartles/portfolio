from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class Phase6CloseoutTests(unittest.TestCase):
    def test_phase_6_roadmap_row_keeps_status_and_pr_in_their_columns(self) -> None:
        roadmap = (ROOT / ".agents/plans/portfolio-10k/roadmap.md").read_text(
            encoding="utf-8"
        )
        row = next(line for line in roadmap.splitlines() if line.startswith("| 6 |"))
        cells = [cell.strip() for cell in row.strip("|").split("|")]

        self.assertEqual("executing", cells[2])
        self.assertEqual(
            "[#29](https://github.com/HarleyBartles/portfolio/pull/29)", cells[6]
        )

    def test_learning_lab_custody_uses_the_root_command_bus_shape(self) -> None:
        custody = (ROOT / "docs/asset-custody.md").read_text(encoding="utf-8")

        self.assertIn(
            "`npm.cmd --prefix src/client run media:learning-lab:check`",
            custody,
        )
        self.assertNotIn("`npm run media:learning-lab:check`", custody)


if __name__ == "__main__":
    unittest.main()
