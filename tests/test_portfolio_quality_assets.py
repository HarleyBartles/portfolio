"""Assets portfolio validation tests."""
from __future__ import annotations
from tests.portfolio_quality_fixture import PortfolioFixture, PortfolioQualityCase

class PortfolioAssetsTests(PortfolioQualityCase):

    def test_privacy_scan_rejects_contact_literals_and_private_paths(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            source = fixture.root / 'src/client/src/example.ts'
            source.write_text("const contact = 'mailto:person@example.com'; const phone = '+44 7700 900123'; const path = 'C:\\\\Users\\\\person\\\\secret'\n", encoding='utf-8')
        findings = self.validate(mutate)
        self.assertTrue(any(('mailto:' in finding for finding in findings)))
        self.assertTrue(any(('email address literal' in finding for finding in findings)))
        self.assertTrue(any(('phone number literal' in finding for finding in findings)))
        self.assertTrue(any(('private filesystem path' in finding for finding in findings)))

    def test_public_voice_scan_rejects_em_dashes_and_decorative_emoji(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            source = fixture.root / 'src/client/src/example.ts'
            source.write_text("export const copy = 'A finished thought—then an AI tail. 🚀'\n", encoding='utf-8')
        findings = self.validate(mutate)
        self.assertTrue(any(('em dash' in finding for finding in findings)))
        self.assertTrue(any(('decorative emoji' in finding for finding in findings)))

    def test_assets_require_custody_and_stay_under_the_image_budget(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            asset = fixture.public / 'media/unrecorded.png'
            asset.write_bytes(b'x' * 409601)
        findings = self.validate(mutate)
        self.assertTrue(any(('exceeds 409600 bytes' in finding for finding in findings)))
        self.assertTrue(any(('missing from asset custody ledgers' in finding for finding in findings)))

    def test_asset_custody_requires_an_exact_public_path(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            fixture.write_custody(['src/client/public/media/example.webp.backup'])
        findings = self.validate(mutate)
        self.assertTrue(any(('missing from asset custody ledgers' in finding for finding in findings)))

    def test_asset_custody_rejects_stale_records_and_covers_source_imports(self) -> None:

        def mutate(fixture: PortfolioFixture) -> None:
            imported = fixture.root / 'src/client/src/media/imported.png'
            imported.parent.mkdir(parents=True, exist_ok=True)
            imported.write_bytes(b'source-import')
            fixture.add_custody_path('src/client/public/media/missing.png')
        findings = self.validate(mutate)
        self.assertTrue(any(('src/client/src/media/imported.png' in finding for finding in findings)))
        self.assertTrue(any(('custody record points to a missing asset' in finding for finding in findings)))
