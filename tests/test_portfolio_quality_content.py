"""Content portfolio validation tests."""
from __future__ import annotations
from tests.portfolio_quality_fixture import PortfolioFixture, PortfolioQualityCase

class PortfolioContentTests(PortfolioQualityCase):

    def test_clean_portfolio_has_no_findings(self) -> None:
        self.assertEqual([], self.validate())

    def test_editorial_writing_requires_the_publication_floor_and_complete_contract(self) -> None:
        mutations = {'fewer than five essays': (lambda fixture: fixture.items.__delitem__(-1), 'at least five published essays'), 'duplicate lead': (lambda fixture: fixture.items[2]['editorial'].__setitem__('indexLead', True), 'exactly one indexLead'), 'missing lead': (lambda fixture: fixture.items[1]['editorial'].__setitem__('indexLead', False), 'exactly one indexLead'), 'unknown visual': (lambda fixture: fixture.items[1]['editorial']['visual'].__setitem__('id', 'unknown-visual'), "unknown visual id 'unknown-visual'"), 'empty visual description': (lambda fixture: fixture.items[1]['editorial']['visual'].__setitem__('description', ' '), 'visual description must be nonempty'), 'empty proposition': (lambda fixture: fixture.items[1]['editorial']['homepageFeature'].__setitem__('proposition', ' '), 'homepage proposition must be nonempty'), 'malformed dateline': (lambda fixture: fixture.items[1]['editorial'].__setitem__('dateline', '2026-08-21'), 'has invalid editorial dateline'), 'generic featured': (lambda fixture: fixture.items[1].__setitem__('featured', True), 'must not use generic featured'), 'generic related slugs': (lambda fixture: fixture.items[1].__setitem__('relatedSlugs', ['essay-2']), 'must not use generic relatedSlugs'), 'missing continuation target': (lambda fixture: fixture.items[1]['editorial']['continuations'][0].__setitem__('slug', 'missing'), "references missing continuation 'missing'"), 'non-editorial continuation target': (lambda fixture: fixture.items[1]['editorial']['continuations'][0].__setitem__('slug', 'example-project'), "references missing continuation 'example-project'"), 'duplicate continuation': (lambda fixture: fixture.items[1]['editorial']['continuations'][1].__setitem__('slug', 'essay-2'), "has duplicate continuation 'essay-2'"), 'self continuation': (lambda fixture: fixture.items[1]['editorial']['continuations'][0].__setitem__('slug', 'essay-1'), 'cannot continue to itself')}
        for label, (mutate_editorial, expected_finding) in mutations.items():
            with self.subTest(label=label):

                def mutate(fixture: PortfolioFixture) -> None:
                    mutate_editorial(fixture)
                    fixture.write_manifest()
                findings = self.validate(mutate)
                self.assertTrue(any((expected_finding in finding for finding in findings)), findings)

    def test_editorial_writing_accepts_six_seven_and_eight_essays(self) -> None:
        for count in (6, 7, 8):
            with self.subTest(count=count):

                def mutate(fixture: PortfolioFixture) -> None:
                    for number in range(6, count + 1):
                        fixture.items.append({'slug': f'essay-{number}', 'kind': 'writing', 'title': f'Example essay {number}', 'status': 'published', 'summary': 'A useful essay.', 'date': '2026-08-21', 'readingMinutes': 4, 'path': f'writing/essay-{number}.md', 'tags': ['writing'], 'relatedSlugs': [], 'editorial': {'dateline': 'Autumn 2026', 'readingMinutes': 4, 'indexLead': False, 'homepageFeature': {'eligible': True, 'proposition': 'A clear proposition.'}, 'visual': {'id': f'essay-{number}-visual', 'description': 'A text equivalent.'}, 'continuations': [{'slug': 'essay-1', 'rationale': 'A deliberate next reading.'}, {'slug': 'essay-2', 'rationale': 'A second deliberate next reading.'}]}})
                    fixture.write()
                self.assertEqual([], self.validate(mutate))

    def test_manifest_rejects_duplicate_slugs_and_unknown_related_content(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]['relatedSlugs'] = ['missing-note']
            duplicate = dict(fixture.items[1])
            duplicate['slug'] = 'Example-Project'
            duplicate['path'] = 'writing/duplicate.md'
            fixture.items.append(duplicate)
            fixture.write_manifest()
        findings = self.validate(mutate)
        self.assertTrue(any(('duplicate slug' in finding for finding in findings)))
        self.assertTrue(any(("unknown related slug 'missing-note'" in finding for finding in findings)))

    def test_manifest_rejects_invalid_kind_status_date_and_reading_time(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]['kind'] = 'case-study'
            fixture.items[0]['status'] = 'amazing'
            fixture.items[1]['date'] = '21 August'
            fixture.items[1]['readingMinutes'] = 0
            fixture.write_manifest()
        findings = self.validate(mutate)
        self.assertTrue(any(("unsupported kind 'case-study'" in finding for finding in findings)))
        self.assertTrue(any(("unsupported status 'amazing'" in finding for finding in findings)))
        self.assertTrue(any(('invalid ISO date' in finding for finding in findings)))
        self.assertTrue(any(('positive integer' in finding for finding in findings)))

    def test_manifest_rejects_non_object_entries_and_an_empty_catalog(self) -> None:

        def non_objects(fixture: PortfolioFixture) -> None:
            fixture.items = [None, 'not-an-item']
            fixture.write_manifest()
        malformed_findings = self.validate(non_objects)
        self.assertTrue(any(('item 1 must be an object' in finding for finding in malformed_findings)))
        self.assertTrue(any(('item 2 must be an object' in finding for finding in malformed_findings)))

        def empty(fixture: PortfolioFixture) -> None:
            fixture.items = []
            fixture.write_manifest()
        empty_findings = self.validate(empty)
        self.assertTrue(any(('items array must not be empty' in finding for finding in empty_findings)))
        self.assertTrue(any(('not listed in the manifest' in finding for finding in empty_findings)))

    def test_manifest_rejects_missing_and_orphaned_markdown(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]['path'] = 'projects/missing.md'
            fixture.write_manifest()
            orphan = fixture.content / 'writing/orphan.md'
            orphan.parent.mkdir(parents=True, exist_ok=True)
            orphan.write_text('# Orphan\n', encoding='utf-8')
        findings = self.validate(mutate)
        self.assertTrue(any(('content file does not exist' in finding for finding in findings)))
        self.assertTrue(any(('not listed in the manifest' in finding for finding in findings)))

    def test_manifest_rejects_unlisted_markdown_regardless_of_filename(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            (fixture.content / 'INDEX.md').write_text('# Content index\n', encoding='utf-8')
            (fixture.content / 'writing/INDEX.md').write_text('# Writing index\n', encoding='utf-8')
            orphan = fixture.content / 'writing/orphan.md'
            orphan.write_text('# Orphan\n', encoding='utf-8')
        findings = self.validate(mutate)
        self.assertTrue(any(('content/INDEX.md' in finding for finding in findings)), findings)
        self.assertTrue(any(('content/writing/INDEX.md' in finding for finding in findings)), findings)
        self.assertTrue(any(('writing/orphan.md' in finding for finding in findings)))

    def test_manifest_paths_must_use_posix_separators(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]['path'] = 'projects\\example-project.md'
            fixture.write_manifest()
        findings = self.validate(mutate)
        self.assertTrue(any(('must use POSIX separators' in finding for finding in findings)))

    def test_manifest_paths_must_be_canonical_vite_glob_keys(self) -> None:
        for noncanonical_path in ('./projects/example-project.md', 'projects//example-project.md'):
            with self.subTest(path=noncanonical_path):

                def mutate(fixture: PortfolioFixture) -> None:
                    fixture.items[0]['path'] = noncanonical_path
                    fixture.write_manifest()
                findings = self.validate(mutate)
                self.assertTrue(any(('must be a canonical POSIX path' in finding for finding in findings)))

    def test_manifest_allows_route_owned_content_without_a_markdown_path(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            source = fixture.content / str(fixture.items[0]['path'])
            source.unlink()
            del fixture.items[0]['path']
            fixture.write_manifest()
        self.assertEqual([], self.validate(mutate))

    def test_manifest_rejects_rendering_metadata(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            fixture.items[0]['presentation'] = 'marketplace-case-study'
            fixture.write_manifest()
        findings = self.validate(mutate)
        self.assertTrue(any(('must not contain rendering metadata' in finding for finding in findings)))

    def test_route_owned_entries_still_validate_shared_metadata(self) -> None:
        for field in ('tags', 'relatedSlugs'):
            with self.subTest(field=field):

                def mutate(fixture: PortfolioFixture) -> None:
                    del fixture.items[0]['path']
                    fixture.items[0][field] = 'not-an-array'
                    fixture.write_manifest()
                findings = self.validate(mutate)
                self.assertTrue(any((f'{field} must be a string array' in finding for finding in findings)))

    def test_patch_showcase_accepts_route_owned_content(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            source = fixture.content / str(fixture.items[0]['path'])
            source.unlink()
            fixture.items[0].update({'slug': 'patch-story', 'kind': 'patch', 'title': 'Patch Story', 'status': 'visual development', 'summary': 'A shaped visual story.'})
            del fixture.items[0]['path']
            fixture.write_manifest()
        self.assertEqual([], self.validate(mutate))
