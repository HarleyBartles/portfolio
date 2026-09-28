"""Wild Bunch portfolio validation tests."""
from __future__ import annotations
import json
import subprocess
from tests.portfolio_quality_fixture import PortfolioFixture, PortfolioQualityCase
from tests.portfolio_quality_fixture import CLIENT_ROOT, ROOT, WILD_BUNCH_MEDIA_ROOT, WILD_BUNCH_MEDIA_SCRIPT

def write_wild_bunch_evidence(fixture: PortfolioFixture, revision: str='2a9814d094148bb789766a27d316095fecce5a60') -> None:
    evidence = {'observedAt': '2026-08-21', 'revision': revision, 'repositoryUrl': 'https://github.com/HarleyBartles/wild-bunch', 'historicalReferenceUrl': 'https://worldofspectrum.org/archive/software/games/the-wild-bunch-firebird-software-ltd', 'status': 'pre-alpha', 'captureRecipe': {'playerName': 'Ranger Vale', 'worldSeed': '00000000-0000-0000-0000-000000000000', 'difficulty': 'Standard', 'entropy': 'Boring', 'startingTown': 'Dustwell'}, 'capabilities': {'implemented': ['Seeded session setup'], 'transitional': ['Visual polish'], 'planned': ['Public accounts and sessions']}, 'representativeEvidence': [{'claim': 'Aggregate and typed events', 'sourceUrl': f'https://github.com/HarleyBartles/wild-bunch/blob/{revision}/src/WildBunch.Domain/Game/GameSession.cs', 'testUrl': f'https://github.com/HarleyBartles/wild-bunch/blob/{revision}/tests/WildBunch.Domain.Tests/Events/GameSessionEventSourcingTests.cs'}], 'images': []}
    evidence_path = fixture.root / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
    evidence_path.parent.mkdir(parents=True, exist_ok=True)
    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')

class PortfolioWildBunchTests(PortfolioQualityCase):

    def test_wild_bunch_evidence_is_required_and_must_be_valid_json(self) -> None:

        def missing(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'wild-bunch'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
        missing_findings = self.validate(missing)
        self.assertTrue(any(('cannot load Wild Bunch evidence' in finding for finding in missing_findings)))

        def malformed(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'wild-bunch'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
            evidence_path = fixture.root / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
            evidence_path.parent.mkdir(parents=True, exist_ok=True)
            evidence_path.write_text('{', encoding='utf-8')
        malformed_findings = self.validate(malformed)
        self.assertTrue(any(('cannot load Wild Bunch evidence' in finding for finding in malformed_findings)))

    def test_wild_bunch_evidence_rejects_invalid_public_coordinates_and_capture_recipe(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'wild-bunch'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
            write_wild_bunch_evidence(fixture, 'main')
            evidence_path = fixture.root / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['observedAt'] = '21 August 2026'
            evidence['repositoryUrl'] = 'http://localhost:5173?password=secret'
            evidence['historicalReferenceUrl'] = 'http://Z:/private/worktree/branch'
            evidence['status'] = ''
            evidence['captureRecipe'] = {'playerName': '', 'worldSeed': 'session-123', 'difficulty': 'Hard', 'entropy': 'Random', 'startingTown': 'Elsewhere'}
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
        findings = self.validate(mutate)
        self.assertTrue(any(('invalid observedAt' in finding for finding in findings)))
        self.assertTrue(any(('repositoryUrl must use HTTPS' in finding for finding in findings)))
        self.assertTrue(any(('historicalReferenceUrl must use HTTPS' in finding for finding in findings)))
        self.assertTrue(any(('revision must be a 40-character commit' in finding for finding in findings)))
        self.assertTrue(any(('status must be nonempty' in finding for finding in findings)))
        self.assertTrue(any(('captureRecipe values must be nonempty strings' in finding for finding in findings)))
        self.assertTrue(any(('private local coordinate' in finding for finding in findings)))

    def test_wild_bunch_evidence_rejects_impossible_observation_dates(self) -> None:
        for observed_at, expected_finding in (('2026-02-30', 'invalid observedAt'),):
            with self.subTest(observed_at=observed_at):

                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]['path']
                    fixture.items[0]['slug'] = 'wild-bunch'
                    fixture.write_manifest()
                    (fixture.content / 'projects/example-project.md').unlink()
                    write_wild_bunch_evidence(fixture)
                    evidence_path = fixture.root / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
                    evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
                    evidence['observedAt'] = observed_at
                    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
                findings = self.validate(mutate)
                self.assertTrue(any((expected_finding in finding for finding in findings)))

    def test_wild_bunch_evidence_rejects_every_private_coordinate_class(self) -> None:
        forbidden_coordinates = ('Z:/private/capture', 'http://localhost:5173', 'password=not-for-publication', 'Host=private;Database=wild-bunch', 'codex/portfolio-10k-phase-4-wild-bunch branch', 'session-0123456789abcdef', 'https://user:pass@github.com/HarleyBartles/wild-bunch', 'http://127.0.0.1:5173', 'https://audit.localhost/evidence', 'https://[::1]/evidence', 'file:///Z:/private/capture')
        for coordinate in forbidden_coordinates:
            with self.subTest(coordinate=coordinate):

                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]['path']
                    fixture.items[0]['slug'] = 'wild-bunch'
                    fixture.write_manifest()
                    (fixture.content / 'projects/example-project.md').unlink()
                    write_wild_bunch_evidence(fixture)
                    evidence_path = fixture.root / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
                    evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
                    evidence['auditNote'] = coordinate
                    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
                findings = self.validate(mutate)
                self.assertTrue(any(('private local coordinate or secret' in finding for finding in findings)))

    def test_wild_bunch_evidence_rejects_a_pathless_pinned_representative_link(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'wild-bunch'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
            write_wild_bunch_evidence(fixture)
            evidence_path = fixture.root / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['representativeEvidence'][0]['sourceUrl'] = 'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/'
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
        findings = self.validate(mutate)
        self.assertTrue(any(('representative evidence 1 sourceUrl must use a canonical pinned repository path' in finding for finding in findings)))

    def test_wild_bunch_evidence_rejects_encoded_representative_path_ambiguity(self) -> None:
        encoded_paths = ('src/%2e%2e/private.cs', 'src/%252e%252e/private.cs', 'src%2fprivate.cs')
        for encoded_path in encoded_paths:
            with self.subTest(encoded_path=encoded_path):

                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]['path']
                    fixture.items[0]['slug'] = 'wild-bunch'
                    fixture.write_manifest()
                    (fixture.content / 'projects/example-project.md').unlink()
                    write_wild_bunch_evidence(fixture)
                    evidence_path = fixture.root / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
                    evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
                    evidence['representativeEvidence'][0]['sourceUrl'] = f'https://github.com/HarleyBartles/wild-bunch/blob/2a9814d094148bb789766a27d316095fecce5a60/{encoded_path}'
                    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
                findings = self.validate(mutate)
                self.assertTrue(any(('representative evidence 1 sourceUrl must use a canonical pinned repository path' in finding for finding in findings)))

    def test_wild_bunch_evidence_rejects_empty_capabilities_unpinned_links_and_malformed_images(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'wild-bunch'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
            write_wild_bunch_evidence(fixture)
            evidence_path = fixture.root / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['capabilities'] = {'implemented': [], 'transitional': [], 'planned': []}
            evidence['representativeEvidence'][0]['sourceUrl'] = 'https://github.com/HarleyBartles/wild-bunch/blob/main/src/WildBunch.Domain/Game/GameSession.cs'
            evidence['images'] = [{'path': 'http://localhost/wild-bunch.png', 'width': 0}]
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
        findings = self.validate(mutate)
        for category in ('implemented', 'transitional', 'planned'):
            self.assertTrue(any((f'capabilities {category}' in finding for finding in findings)))
        self.assertTrue(any(('representative evidence' in finding and 'pinned revision' in finding for finding in findings)))
        self.assertTrue(any(('image 1 requires a positive width and height' in finding for finding in findings)))
        self.assertTrue(any(('image 1 path must be a public custody path' in finding for finding in findings)))

    def test_wild_bunch_commits_the_screened_responsive_derivative_inventory(self) -> None:
        evidence_path = ROOT / 'src/client/src/data/case-studies/wild-bunch-evidence.json'
        evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
        images = evidence['images']
        expected = {(capture, width, image_format) for capture, widths in {'dustwell-town': (720, 1200), 'trail-map': (720, 1200), 'session-audit': (720, 1200), 'wanted-notice': (640, 960), 'case-file': (640, 960)}.items() for width in widths for image_format in ('avif', 'webp')}
        actual = {(image.get('capture'), image.get('width'), image.get('format')) for image in images}
        self.assertEqual(actual, expected)
        self.assertEqual(len(images), len(expected))
        for image in images:
            path = ROOT / image['path']
            self.assertTrue(path.is_file(), image['path'])
            self.assertEqual(path.parent, WILD_BUNCH_MEDIA_ROOT)
            self.assertEqual(path.suffix, f".{image['format']}")
            self.assertEqual(path.stat().st_size, image['bytes'])
            self.assertLessEqual(path.stat().st_size, 400 * 1024)
            self.assertGreater(image['width'], 0)
            self.assertGreater(image['height'], 0)
            self.assertTrue(image['altIntent'].startswith('Current development build'))
            self.assertIn('working skeleton', image['caption'])

    def test_wild_bunch_media_apply_requires_a_source_directory(self) -> None:
        result = subprocess.run(['node', str(WILD_BUNCH_MEDIA_SCRIPT), '--apply'], cwd=CLIENT_ROOT, text=True, capture_output=True, check=False)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('--source-dir', result.stdout + result.stderr)
