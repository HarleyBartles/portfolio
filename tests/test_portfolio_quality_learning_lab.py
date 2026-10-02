"""Learning Lab portfolio validation tests."""
from __future__ import annotations
import json
from datetime import date
from pathlib import Path
from tests.portfolio_quality_fixture import PortfolioFixture, PortfolioQualityCase

def use_learning_lab_content(fixture: PortfolioFixture) -> Path:
    fixture.items[0]['slug'] = 'agentic-learning-lab'
    fixture.write_manifest()
    return fixture.root / 'src/client/src/data/case-studies/learning-lab-evidence.json'

def write_learning_lab_evidence(fixture: PortfolioFixture) -> None:
    revision = '3d8e92ceaebcbb67f0ede5bda95846da8e18b80d'
    courses = [{'id': 'course-1', 'stage': 'complete', 'title': 'Agentic Engineering 101: Zero to Hero', 'outcome': 'Direct, understand, provision, navigate, verify, and safely operate useful agent work.', 'modules': [{'id': '1', 'title': 'From chatbot to worker', 'state': 'mature-lab'}, {'id': '2', 'title': 'Give the cloud agent the project', 'state': 'mature-lab'}, {'id': '3', 'title': 'The project has a home', 'state': 'mature-lab'}, {'id': '4', 'title': 'Repositories, save points, and safe breakage', 'state': 'mature-lab'}, {'id': '5', 'title': 'Model, harness, context, tools, and behaviour', 'state': 'mature-lab'}, {'id': '6', 'title': 'What does the model know?', 'state': 'mature-lab'}, {'id': '7', 'title': 'Tools, operating knowledge, and domain provisioning', 'state': 'mature-lab'}, {'id': '8', 'title': 'What did we just create? Local work and connected systems', 'state': 'mature-lab'}, {'id': '9', 'title': 'Source of truth and verification', 'state': 'mature-lab'}, {'id': '10', 'title': 'Build a real agentic project', 'state': 'mature-lab'}]}, {'id': 'course-2', 'stage': 'substantially-planned', 'title': 'Advanced Agentic Engineering: Mastering Agents', 'outcome': 'Design agent behaviour, workflow, context, delegation, evaluation, and autonomy.', 'modules': [{'id': '1', 'title': 'Agent self-introspection and local review', 'state': 'roadmap-module'}, {'id': '2', 'title': 'Autonomous human-in-the-loop workflows', 'state': 'roadmap-module'}, {'id': '3', 'title': 'Specialist sub-agents and orchestration', 'state': 'roadmap-module'}, {'id': '4', 'title': 'Harnesses, portability, and agent observability', 'state': 'roadmap-module'}, {'id': '5', 'title': 'The 20-Agent Bonfire and context transport', 'state': 'roadmap-module'}, {'id': '6', 'title': 'Selective provisioning, context, and evaluation', 'state': 'roadmap-module'}, {'id': '7', 'title': 'Trust boundaries and connected autonomy', 'state': 'roadmap-module'}, {'id': '8', 'title': 'Concurrent agents and isolation', 'state': 'roadmap-module'}, {'id': '9', 'title': 'Retrospective: how this repo was built', 'state': 'roadmap-module'}]}, {'id': 'course-3', 'stage': 'early-outline', 'title': 'Beyond the Agent: Engineering Agent Systems', 'outcome': 'Design trust, coordination, concurrency, integration, provenance, and operational behaviour around agents.', 'modules': []}]
    for course in courses:
        for module in course['modules']:
            module['summary'] = 'A concise editorial account of what the learner earns.'
    evidence = {'observedAt': '2026-08-25', 'repositoryUrl': 'https://github.com/HarleyBartles/agentic-learning-lab', 'sourceChangeUrl': 'https://github.com/HarleyBartles/agentic-learning-lab/pull/13', 'sourceRevision': revision, 'integrityRunUrl': 'https://github.com/HarleyBartles/agentic-learning-lab/actions/runs/32812192933', 'matureLabCount': 10, 'delivery': {'status': 'planned', 'target': '2026-08', 'display': 'late August 2026'}, 'licensing': {'freelyLicensed': True, 'policyPath': 'LICENSE.md', 'curriculum': {'spdx': 'CC-BY-4.0', 'path': 'LICENSES/CC-BY-4.0.txt', 'url': 'https://creativecommons.org/licenses/by/4.0/'}, 'tooling': {'spdx': 'MIT', 'path': 'LICENSES/MIT.txt', 'url': 'https://opensource.org/license/mit'}}, 'courses': courses, 'proof': {'curriculum': 'README.md', 'curriculumShape': 'docs/curriculum-shape.md', 'course2Index': 'modules/course-2/README.md', 'lab3': 'labs/03-project-has-a-home/README.md', 'lab3Instructions': 'labs/03-project-has-a-home/project/AGENTS.md', 'lab4': 'labs/04-repositories-save-points-and-safe-breakage/README.md', 'lab5': 'labs/05-model-harness-context-tools-and-behaviour/README.md', 'lab7': 'labs/07-tools-operating-knowledge-and-domain-provisioning/README.md', 'licencePolicy': 'LICENSE.md', 'curriculumLicence': 'LICENSES/CC-BY-4.0.txt', 'toolingLicence': 'LICENSES/MIT.txt', 'integrity': 'tests/test_repo_integrity.py'}}
    evidence_path = fixture.root / 'src/client/src/data/case-studies/learning-lab-evidence.json'
    evidence_path.parent.mkdir(parents=True, exist_ok=True)
    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')

class PortfolioLearningLabTests(PortfolioQualityCase):

    def test_learning_lab_content_requires_evidence(self) -> None:

        def missing(fixture: PortfolioFixture) -> None:
            use_learning_lab_content(fixture)
        missing_findings = self.validate(missing)
        self.assertTrue(any(('cannot load Learning Lab evidence' in finding for finding in missing_findings)))

        def malformed(fixture: PortfolioFixture) -> None:
            evidence_path = use_learning_lab_content(fixture)
            evidence_path.parent.mkdir(parents=True, exist_ok=True)
            evidence_path.write_text('{', encoding='utf-8')
        malformed_findings = self.validate(malformed)
        self.assertTrue(any(('cannot load Learning Lab evidence' in finding for finding in malformed_findings)))

    def test_learning_lab_evidence_rejects_invalid_taxonomy_and_maturity(self) -> None:
        mutations = {'invalid observation date': (lambda evidence: evidence.__setitem__('observedAt', '24 August 2026'), 'observedAt must be an ISO date'), 'short revision': (lambda evidence: evidence.__setitem__('sourceRevision', 'short'), 'sourceRevision must be a 40-character commit'), 'duplicate identifier': (lambda evidence: evidence['courses'][1]['modules'][1].__setitem__('id', '1'), 'module identifiers must be unique within each course'), 'unknown maturity': (lambda evidence: evidence['courses'][0]['modules'][0].__setitem__('state', 'complete'), 'module 1 state must be mature-lab or roadmap-module'), 'missing editorial summary': (lambda evidence: evidence['courses'][0]['modules'][0].__setitem__('summary', ''), 'module 1 requires a nonempty editorial summary'), 'wrong mature count': (lambda evidence: evidence.__setitem__('matureLabCount', 9), 'matureLabCount must match the 10 mature-lab modules')}
        for label, (mutate_evidence, expected) in mutations.items():
            with self.subTest(label=label):

                def mutate(fixture: PortfolioFixture) -> None:
                    evidence_path = use_learning_lab_content(fixture)
                    write_learning_lab_evidence(fixture)
                    evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
                    mutate_evidence(evidence)
                    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
                self.assertTrue(any((expected in finding for finding in self.validate(mutate))), expected)

    def test_learning_lab_delivery_changes_only_from_authored_evidence(self) -> None:

        def undated_planned(fixture: PortfolioFixture) -> None:
            evidence_path = use_learning_lab_content(fixture)
            write_learning_lab_evidence(fixture)
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['delivery'] = {'status': 'planned', 'display': 'Planned'}
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
        self.assertEqual([], self.validate(undated_planned, today=date(2030, 1, 1)))

        def stale_planned(fixture: PortfolioFixture) -> None:
            use_learning_lab_content(fixture)
            write_learning_lab_evidence(fixture)
        stale = self.validate(stale_planned, today=date(2026, 9, 1))
        self.assertTrue(any(('delivery planned state is stale after 2026-08' in finding for finding in stale)))
        started_mutations = {'missing date': (lambda delivery: delivery.pop('startedOn', None), 'started delivery requires startedOn'), 'invalid date': (lambda delivery: delivery.__setitem__('startedOn', 'late August'), 'startedOn must be an ISO date'), 'future date': (lambda delivery: delivery.__setitem__('startedOn', '2026-08-25'), 'startedOn must not be in the future')}
        for label, (mutate_delivery, expected) in started_mutations.items():
            with self.subTest(label=label):

                def mutate(fixture: PortfolioFixture) -> None:
                    evidence_path = use_learning_lab_content(fixture)
                    write_learning_lab_evidence(fixture)
                    evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
                    evidence['delivery'] = {'status': 'started', 'startedOn': '2026-08-23', 'display': '23 August 2026'}
                    mutate_delivery(evidence['delivery'])
                    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
                findings = self.validate(mutate, today=date(2026, 8, 24))
                self.assertTrue(any((expected in finding for finding in findings)), expected)

        def planned_with_started_date(fixture: PortfolioFixture) -> None:
            evidence_path = use_learning_lab_content(fixture)
            write_learning_lab_evidence(fixture)
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['delivery']['startedOn'] = '2026-08-23'
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
        findings = self.validate(planned_with_started_date, today=date(2026, 8, 24))
        self.assertTrue(any(('planned delivery must not include startedOn' in finding for finding in findings)))

    def test_learning_lab_evidence_bounds_licensing_and_public_claims(self) -> None:
        mutations = {'missing curriculum licence': (lambda evidence: evidence['licensing']['curriculum'].__setitem__('spdx', ''), 'freelyLicensed requires curriculum SPDX CC-BY-4.0'), 'missing tooling licence': (lambda evidence: evidence['licensing']['tooling'].__setitem__('spdx', ''), 'freelyLicensed requires tooling SPDX MIT'), 'missing policy path': (lambda evidence: evidence['licensing'].__setitem__('policyPath', ''), 'freelyLicensed requires policyPath LICENSE.md'), 'missing licence link': (lambda evidence: evidence['licensing']['curriculum'].__setitem__('url', ''), 'freelyLicensed requires HTTPS curriculum and tooling licence links'), 'false freely licensed flag': (lambda evidence: evidence['licensing'].__setitem__('freelyLicensed', False), 'licensing freelyLicensed must be true'), 'missing freely licensed flag': (lambda evidence: evidence['licensing'].pop('freelyLicensed'), 'licensing freelyLicensed must be true'), 'non-boolean freely licensed flag': (lambda evidence: evidence['licensing'].__setitem__('freelyLicensed', 'true'), 'licensing freelyLicensed must be true'), 'snapshot without commit': (lambda evidence: evidence.__setitem__('sourceRevision', ''), 'sourceRevision must be a 40-character commit'), 'unsupported learner claim': (lambda evidence: evidence['proof'].__setitem__('claim', 'tested with real learners'), 'must not claim tested with real learners')}
        for label, (mutate_evidence, expected) in mutations.items():
            with self.subTest(label=label):

                def mutate(fixture: PortfolioFixture) -> None:
                    evidence_path = use_learning_lab_content(fixture)
                    write_learning_lab_evidence(fixture)
                    evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
                    mutate_evidence(evidence)
                    evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
                self.assertTrue(any((expected in finding for finding in self.validate(mutate))), expected)

    def test_learning_lab_evidence_accepts_planned_and_started_states(self) -> None:

        def planned(fixture: PortfolioFixture) -> None:
            use_learning_lab_content(fixture)
            write_learning_lab_evidence(fixture)
        self.assertEqual([], self.validate(planned, today=date(2026, 8, 24)))

        def started(fixture: PortfolioFixture) -> None:
            evidence_path = use_learning_lab_content(fixture)
            write_learning_lab_evidence(fixture)
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['delivery'] = {'status': 'started', 'startedOn': '2026-08-23', 'display': '23 August 2026'}
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
        self.assertEqual([], self.validate(started, today=date(2026, 8, 24)))

        def started_without_display(fixture: PortfolioFixture) -> None:
            evidence_path = use_learning_lab_content(fixture)
            write_learning_lab_evidence(fixture)
            evidence = json.loads(evidence_path.read_text(encoding='utf-8'))
            evidence['delivery'] = {'status': 'started', 'startedOn': '2026-08-23'}
            evidence_path.write_text(json.dumps(evidence), encoding='utf-8')
        findings = self.validate(started_without_display, today=date(2026, 8, 24))
        self.assertTrue(any(('started delivery requires display text' in finding for finding in findings)))
