"""Shared temporary portfolio fixture and validator test base."""
from __future__ import annotations
import json
import tempfile
import unittest
from datetime import date
from pathlib import Path
from tests.validation.portfolio import validate_portfolio
ROOT = Path(__file__).resolve().parents[1]
CLIENT_ROOT = ROOT / 'src/client'
WILD_BUNCH_MEDIA_ROOT = CLIENT_ROOT / 'public/media/wild-bunch'
WILD_BUNCH_MEDIA_SCRIPT = CLIENT_ROOT / 'scripts/process-wild-bunch-captures.mjs'

class PortfolioFixture:

    def __init__(self, root: Path) -> None:
        self.root = root
        self.content = root / 'src/client/src/data/content'
        self.public = root / 'src/client/public'
        self.docs = root / 'docs'
        self.marketplace = root / '.agents/plugins/marketplace-source/codex-marketplace'
        self.items = [{'slug': 'example-project', 'kind': 'project', 'title': 'Example project', 'status': 'live', 'summary': 'An inspectable example.', 'path': 'projects/example-project.md', 'tags': ['project'], 'relatedSlugs': ['essay-1']}, {'slug': 'essay-1', 'kind': 'writing', 'title': 'Example essay 1', 'status': 'published', 'summary': 'A useful essay.', 'date': '2026-08-21', 'readingMinutes': 4, 'path': 'writing/essay-1.md', 'tags': ['writing'], 'relatedSlugs': [], 'editorial': {'dateline': 'Autumn 2026', 'readingMinutes': 4, 'indexLead': True, 'homepageFeature': {'eligible': True, 'proposition': 'A clear proposition.'}, 'visual': {'id': 'essay-1-visual', 'description': 'A text equivalent.'}, 'continuations': [{'slug': 'essay-2', 'rationale': 'A deliberate next reading.'}, {'slug': 'essay-3', 'rationale': 'A second deliberate next reading.'}]}}]
        for number in range(2, 6):
            self.items.append({'slug': f'essay-{number}', 'kind': 'writing', 'title': f'Example essay {number}', 'status': 'published', 'summary': 'A useful essay.', 'date': '2026-08-21', 'readingMinutes': 4, 'path': f'writing/essay-{number}.md', 'tags': ['writing'], 'relatedSlugs': [], 'editorial': {'dateline': 'Autumn 2026', 'readingMinutes': 4, 'indexLead': False, 'homepageFeature': {'eligible': True, 'proposition': 'A clear proposition.'}, 'visual': {'id': f'essay-{number}-visual', 'description': 'A text equivalent.'}, 'continuations': [{'slug': 'essay-1', 'rationale': 'A deliberate next reading.'}, {'slug': 'essay-2' if number != 2 else 'essay-3', 'rationale': 'A second deliberate next reading.'}]}})

    def write(self) -> None:
        for item in self.items:
            if not isinstance(item.get('path'), str):
                continue
            path = self.content / item['path']
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(f"# {item['title']}\n", encoding='utf-8')
        self.write_manifest()
        asset = self.public / 'media/example.webp'
        asset.parent.mkdir(parents=True, exist_ok=True)
        asset.write_bytes(b'RIFF-owned-image')
        self.write_custody(['src/client/public/media/example.webp'])
        source = self.root / 'src/client/src/example.ts'
        source.parent.mkdir(parents=True, exist_ok=True)
        source.write_text("export const label = 'safe'\n", encoding='utf-8')

    def write_custody(self, paths: list[str]) -> None:
        ledger = self.docs / 'asset-custody/fixture.json'
        ledger.parent.mkdir(parents=True, exist_ok=True)
        ledger.write_text(json.dumps({'family': 'fixture', 'groups': [], 'assetPaths': paths}), encoding='utf-8')

    def add_custody_path(self, path: str) -> None:
        ledger = self.docs / 'asset-custody/fixture.json'
        data = json.loads(ledger.read_text(encoding='utf-8'))
        data['assetPaths'].append(path)
        ledger.write_text(json.dumps(data), encoding='utf-8')

    def write_manifest(self) -> None:
        self.content.mkdir(parents=True, exist_ok=True)
        (self.content / 'content-manifest.json').write_text(json.dumps({'items': self.items}), encoding='utf-8')

class PortfolioQualityCase(unittest.TestCase):

    def validate(self, mutate=None, *, today: date | None=None) -> list[str]:
        with tempfile.TemporaryDirectory() as temporary:
            fixture = PortfolioFixture(Path(temporary))
            fixture.write()
            if mutate is not None:
                mutate(fixture)
            return [str(finding) for finding in validate_portfolio(fixture.root, today=today)]
