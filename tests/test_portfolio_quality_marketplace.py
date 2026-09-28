"""Marketplace portfolio validation tests."""
from __future__ import annotations
import json
import subprocess
import tempfile
from pathlib import Path
from tests.portfolio_quality_fixture import PortfolioFixture, PortfolioQualityCase
from tests.validation.portfolio import validate_portfolio

def write_marketplace(fixture: PortfolioFixture) -> str:
    plugin_names = ['agentic-evaluation', 'agentic-workflows', 'api-contracts-pack', 'architecture-pack', 'data-platform-pack', 'dotnet-pack', 'engineering-pack', 'feature-sliced-design', 'frontend-pack', 'language-patterns-pack', 'mcp-usage-pack', 'planning-pack', 'repo-worker-pack', 'research-pack', 'security-pack', 'superpowers-plus', 'unslop-plus']
    fixture.marketplace.mkdir(parents=True, exist_ok=True)
    (fixture.marketplace / 'manifest.json').write_text(json.dumps({'plugins': [{'name': name} for name in plugin_names]}), encoding='utf-8')
    entry_names = [f'skill-{index}' for index in range(70)] + ['skill-0', 'skill-1', 'skill-2', 'skill-3']
    cursor = 0
    for index, plugin_name in enumerate(plugin_names):
        entry_count = 5 if index < 6 else 4
        entries = [{'canonical_name': name} for name in entry_names[cursor:cursor + entry_count]]
        cursor += entry_count
        bundle = fixture.marketplace / 'plugins' / plugin_name / 'references'
        bundle.mkdir(parents=True, exist_ok=True)
        (bundle / 'bundle-manifest.json').write_text(json.dumps({'entries': entries}), encoding='utf-8')
    subprocess.run(['git', 'init', '-q'], cwd=fixture.marketplace, check=True)
    subprocess.run(['git', 'config', 'user.email', 'fixture@example.test'], cwd=fixture.marketplace, check=True)
    subprocess.run(['git', 'config', 'user.name', 'Portfolio fixture'], cwd=fixture.marketplace, check=True)
    subprocess.run(['git', 'add', '.'], cwd=fixture.marketplace, check=True)
    subprocess.run(['git', 'commit', '-qm', 'fixture inventory'], cwd=fixture.marketplace, check=True)
    return subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=fixture.marketplace, text=True).strip()

def write_marketplace_evidence(fixture: PortfolioFixture, revision: str | None=None) -> None:
    actual_revision = write_marketplace(fixture)
    marketplace_revision = actual_revision if revision is None else revision
    evidence = {'observedAt': '2026-08-21', 'marketplaceRevision': marketplace_revision, 'inventory': {'pluginCount': 17, 'entryCount': 74, 'uniqueSkillCount': 70}, 'plugins': ['agentic-evaluation', 'agentic-workflows', 'api-contracts-pack', 'architecture-pack', 'data-platform-pack', 'dotnet-pack', 'engineering-pack', 'feature-sliced-design', 'frontend-pack', 'language-patterns-pack', 'mcp-usage-pack', 'planning-pack', 'repo-worker-pack', 'research-pack', 'security-pack', 'superpowers-plus', 'unslop-plus'], 'consumers': [{'name': 'Portfolio', 'url': 'https://github.com/example/portfolio', 'commit': 'a' * 40, 'marketplaceRevision': marketplace_revision, 'plugins': ['repo-worker-pack', 'superpowers-plus', 'mcp-usage-pack', 'frontend-pack'], 'installedSkillCount': 42, 'localSkills': ['asset-custody'], 'localPlugins': []}]}
    evidence_path = fixture.root / 'src/client/src/data/case-studies/marketplace-evidence.json'
    evidence_path.parent.mkdir(parents=True, exist_ok=True)
    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')

class PortfolioMarketplaceTests(PortfolioQualityCase):

    def test_marketplace_evidence_rejects_invalid_snapshot_and_private_coordinates(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'codex-marketplace'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
            write_marketplace_evidence(fixture, 'b' * 40)
            evidence_path = fixture.root / 'src/client/src/data/case-studies/marketplace-evidence.json'
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['observedAt'] = '21 August 2026'
            evidence['inventory']['entryCount'] = -1
            evidence['plugins'].append('missing-plugin')
            evidence['consumers'].append(dict(evidence['consumers'][0]))
            evidence['consumers'][0]['url'] = 'http://Z:/private/branch/codex'
            evidence['consumers'][0]['commit'] = 'short'
            evidence['consumers'][0]['plugins'].append('consumer-only-plugin')
            evidence['consumers'][0]['plugins'].append('repo-worker-pack')
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
        findings = self.validate(mutate)
        self.assertTrue(any(('invalid observedAt' in finding for finding in findings)))
        self.assertTrue(any(('inventory entryCount must be a non-negative integer' in finding for finding in findings)))
        self.assertTrue(any(('inventory pluginCount must match the snapshot plugin list' in finding for finding in findings)))
        self.assertTrue(any(('duplicate consumer name' in finding for finding in findings)))
        self.assertTrue(any(('HTTPS' in finding for finding in findings)))
        self.assertTrue(any(('40-character commit' in finding for finding in findings)))
        self.assertTrue(any(('private local coordinate' in finding for finding in findings)))
        self.assertTrue(any(('absent from this evidence snapshot' in finding for finding in findings)))
        self.assertTrue(any(('must not contain duplicates' in finding for finding in findings)))

    def test_marketplace_evidence_may_lag_current_marketplace_without_warning(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            fixture = PortfolioFixture(Path(temporary))
            fixture.write()
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'codex-marketplace'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
            write_marketplace_evidence(fixture, 'b' * 40)
            evidence_path = fixture.root / 'src/client/src/data/case-studies/marketplace-evidence.json'
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['inventory'] = {'pluginCount': 18, 'entryCount': 75, 'uniqueSkillCount': 71}
            evidence['plugins'].append('historical-plugin')
            evidence['consumers'][0]['plugins'].append('historical-plugin')
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
            warnings = []
            findings = validate_portfolio(fixture.root, warnings=warnings)
        self.assertEqual(findings, [])
        self.assertEqual(warnings, [])

    def test_marketplace_evidence_is_required_and_must_be_valid_json(self) -> None:

        def missing(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'codex-marketplace'
            fixture.write_manifest()
        missing_findings = self.validate(missing)
        self.assertTrue(any(('cannot load Marketplace evidence' in finding for finding in missing_findings)))

        def malformed(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'codex-marketplace'
            fixture.write_manifest()
            evidence_path = fixture.root / 'src/client/src/data/case-studies/marketplace-evidence.json'
            evidence_path.parent.mkdir(parents=True, exist_ok=True)
            evidence_path.write_text('{', encoding='utf-8')
        malformed_findings = self.validate(malformed)
        self.assertTrue(any(('cannot load Marketplace evidence' in finding for finding in malformed_findings)))

    def test_marketplace_evidence_accepts_explicit_local_boundaries(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'codex-marketplace'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
            write_marketplace_evidence(fixture)
        self.assertEqual([], self.validate(mutate))
