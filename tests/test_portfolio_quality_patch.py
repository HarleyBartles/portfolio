"""Patch portfolio validation tests."""
from __future__ import annotations
import json
from PIL import Image
from tests.portfolio_quality_fixture import PortfolioFixture, PortfolioQualityCase

def write_patch_evidence(fixture: PortfolioFixture) -> None:
    revision = '13bf77adc63cf5c8f49363cedd5dd392822b8375'
    asset_path = 'src/client/public/media/patch/patch-example.webp'
    asset = fixture.root / asset_path
    asset.parent.mkdir(parents=True, exist_ok=True)
    Image.new('RGB', (1, 1), 'white').save(asset, 'WEBP')
    fixture.add_custody_path(asset_path)
    evidence = {'observedAt': '2026-08-24', 'repositoryUrl': 'https://github.com/HarleyBartles/adventures-of-patch', 'sourceRevision': revision, 'pipeline': [{'id': identifier, 'name': name, 'input': 'A public-safe input.', 'decision': 'A human gate.', 'output': 'A bounded output.', 'stopCondition': 'The gate does not clear.'} for identifier, name in (('seed', 'Seed'), ('frame', 'Frame'), ('visual-preproduction', 'Visual pre-production'), ('image-generation-and-qa', 'Image generation and QA'), ('deterministic-compilation', 'Deterministic compilation'), ('published-artefact-and-receipt', 'Published artefact and receipt'))], 'published': [{'title': 'Club DB', 'status': 'published', 'publicArtefactUrl': f'https://github.com/HarleyBartles/adventures-of-patch/blob/{revision}/published/adventures/club_db_bouncer_queue_v6_canonical.pptx'}, {'title': 'Goldilocks', 'status': 'published', 'publicArtefactUrl': f'https://github.com/HarleyBartles/adventures-of-patch/blob/{revision}/published/fairytales/goldilocks/page__right_amount_of_guidance__v1.png'}, {'title': "The Sorcerer's Apprentice", 'status': 'published', 'publicArtefactUrl': f'https://github.com/HarleyBartles/adventures-of-patch/blob/{revision}/published/fairytales/sorcerers-apprentice/page__delegation_without_boundaries__v1.png'}, {'title': 'Introducing Patch', 'status': 'published', 'publicArtefactUrl': f'https://github.com/HarleyBartles/adventures-of-patch/blob/{revision}/published/misc/introducing-patch/page__v1.png'}], 'inFlight': [{'title': 'The Usual Specialists', 'status': 'advanced-visual-preproduction', 'lesson': 'Lawful authority can cross a protected boundary without an invisible bypass.', 'currentEvidence': 'Approved specialist reference sheets.', 'remaining': 'Comic adaptation and deck plan remain incomplete.'}, {'title': 'Tournament of Reasonable Defaults', 'status': 'visual-development', 'lesson': 'Stakeholder consultation prevents false deliverables.', 'currentEvidence': 'Reference material is present.', 'remaining': 'Revised scene planning and deck work remain.'}, {'title': 'Identity Emporium', 'status': 'visual-development', 'lesson': 'Identity requires more than a costume.', 'currentEvidence': 'World proof is present.', 'remaining': 'Asset and deck readiness remain incomplete.'}], 'storyLab': {'fairytalePlans': [{'title': 'The Boy Who Cried Wolf', 'lesson': 'Preserve escalation signal.'}, {'title': "The Emperor's New Clothes", 'lesson': "Agreement can't stand in for evidence."}, {'title': 'Hansel and Gretel', 'lesson': 'Leave purposeful recovery breadcrumbs.'}, {'title': 'The Three Little Pigs', 'lesson': 'Build resilience before predictable pressure.'}, {'title': 'Cinderella', 'lesson': 'Let temporary authority expire.'}, {'title': 'Little Red Riding Hood', 'lesson': 'Verify identity, provenance, and authority.'}, {'title': 'Jack and the Beanstalk', 'lesson': 'Distinguish technical capability from authorisation.'}], 'adventurePlans': [{'title': 'Test Goblin', 'lesson': 'Turn failure-mode suspicion into ranked, executable test scenarios.'}, {'title': "The Tiny Change That Wasn't", 'lesson': 'Map consumers, tests, migrations, documentation, and operations before treating a small diff as a small blast radius.'}, {'title': 'Review Dragon', 'lesson': 'Shape completed work into a reviewer handoff with intent, risk, evidence, gaps, and requested attention.'}, {'title': 'Hall of Mirrors', 'lesson': 'Separate observation, inference, assumption, contradiction, and uncertainty before proposing a bounded hypothesis and next check.'}]}, 'media': [{'path': asset_path, 'width': 1, 'height': 1, 'bytes': asset.stat().st_size, 'custody': 'Introducing Patch source base, whole-character horizontal crop.', 'sourceType': 'repository-evidence', 'sourceStatus': 'accepted', 'sourceRevision': revision, 'family': 'hero', 'format': 'webp', 'sourcePath': 'published/misc/introducing-patch/source.png', 'sourceSha256': 'b' * 64}]}
    evidence_path = fixture.root / 'src/client/src/data/case-studies/patch-evidence.json'
    evidence_path.parent.mkdir(parents=True, exist_ok=True)
    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
    receipt_path = fixture.root / 'src/client/public/media/patch/patch-derivatives.json'
    receipt_path.write_text(json.dumps({'sourceRevision': revision, 'images': [dict(evidence['media'][0])]}), encoding='utf-8')

class PortfolioPatchTests(PortfolioQualityCase):

    def test_patch_evidence_rejects_invalid_production_claims_and_private_coordinates(self) -> None:
        mutations = {'short source revision': (lambda evidence: evidence.__setitem__('sourceRevision', 'short'), 'sourceRevision must be a 40-character commit'), 'mutable public artefact URL': (lambda evidence: evidence['published'][0].__setitem__('publicArtefactUrl', 'https://github.com/HarleyBartles/adventures-of-patch/blob/main/published/adventures/club-db.pptx'), 'must use the pinned source revision'), 'unsupported status': (lambda evidence: evidence['inFlight'][0].__setitem__('status', 'live'), "unsupported status 'live'"), 'published record without public artefact': (lambda evidence: evidence['published'][0].pop('publicArtefactUrl'), 'published record 1 requires a publicArtefactUrl'), 'in-flight record without remaining work': (lambda evidence: evidence['inFlight'][0].pop('remaining'), 'in-flight record 1 requires remaining'), 'future item with a date': (lambda evidence: evidence['storyLab']['fairytalePlans'].append({'title': 'A future fairytale', 'lesson': 'A future lesson.', 'date': '2026-09-01'}), 'future-work item must not contain date'), 'Linear identifier': (lambda evidence: evidence['pipeline'][0].__setitem__('decision', 'PATCH-42 decides it.'), 'private coordinate or credential'), 'private coordinate': (lambda evidence: evidence['pipeline'][0].__setitem__('output', 'Z:/private/output'), 'private coordinate or credential'), 'signed URL': (lambda evidence: evidence['pipeline'][0].__setitem__('input', 'https://example.test/file?signature=private'), 'private coordinate or credential'), 'credential': (lambda evidence: evidence['pipeline'][0].__setitem__('input', 'token=private'), 'private coordinate or credential'), 'connector identifier': (lambda evidence: evidence['pipeline'][0].__setitem__('input', 'connector_id=private'), 'private coordinate or credential'), 'file URL': (lambda evidence: evidence['pipeline'][0].__setitem__('input', 'file:///var/private/receipt'), 'private coordinate or credential'), 'Unix coordinate': (lambda evidence: evidence['pipeline'][0].__setitem__('input', '/var/private/receipt'), 'private coordinate or credential'), 'media without dimensions and custody': (lambda evidence: evidence['media'][0].update({'width': 0, 'height': 0, 'custody': ''}), 'requires positive intrinsic dimensions'), 'false media dimension': (lambda evidence: evidence['media'][0].__setitem__('width', 2), 'does not match derivative receipt'), 'duplicate media': (lambda evidence: evidence['media'].append(dict(evidence['media'][0])), 'complete unique derivative receipt inventory'), 'generated pose without accepted source': (lambda evidence: evidence['media'][0].update({'sourceType': 'generated-pose', 'sourceStatus': 'candidate'}), 'generated pose requires accepted sourceStatus')}
        for label, (mutate_evidence, expected_finding) in mutations.items():
            with self.subTest(label=label):

                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]['path']
                    fixture.items[0]['slug'] = 'adventures-of-patch'
                    fixture.items[0]['status'] = 'active project'
                    fixture.write_manifest()
                    (fixture.content / 'projects/example-project.md').unlink()
                    write_patch_evidence(fixture)
                    evidence_path = fixture.root / 'src/client/src/data/case-studies/patch-evidence.json'
                    evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
                    mutate_evidence(evidence)
                    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
                findings = self.validate(mutate)
                self.assertTrue(any((expected_finding in finding for finding in findings)), findings)

    def test_patch_evidence_accepts_the_public_safe_contract(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            del fixture.items[0]['path']
            fixture.items[0]['slug'] = 'adventures-of-patch'
            fixture.items[0]['status'] = 'active project'
            fixture.write_manifest()
            (fixture.content / 'projects/example-project.md').unlink()
            write_patch_evidence(fixture)
        self.assertEqual([], self.validate(mutate))
