from __future__ import annotations

import json
import tempfile
import threading
import unittest
from contextlib import contextmanager
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Iterator

from tools.check_public_routes import check_public_routes, expected_public_routes


def page(title: str, canonical: str) -> bytes:
    return (
        '<!doctype html><html lang="en"><head>'
        f'<title>{title}</title><link rel="canonical" href="{canonical}">'
        '</head><body><main>Portfolio</main></body></html>'
    ).encode()


@contextmanager
def serving(responses: dict[str, list[tuple[int, str, bytes, dict[str, str]]]]) -> Iterator[tuple[str, list[str]]]:
    requests: list[str] = []

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self) -> None:  # noqa: N802 - HTTP handler API
            requests.append(self.path)
            choices = responses.get(self.path, [(404, 'text/html', page('Page Not Found', origin), {})])
            status, content_type, body, headers = choices.pop(0) if len(choices) > 1 else choices[0]
            self.send_response(status)
            self.send_header('Content-Type', content_type)
            for name, value in headers.items():
                self.send_header(name, value)
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_args: object) -> None:
            return

    server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    origin = f'http://127.0.0.1:{server.server_port}/portfolio'
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield origin, requests
    finally:
        server.shutdown()
        thread.join()
        server.server_close()


class PublicRouteTests(unittest.TestCase):
    def setUp(self) -> None:
        self.manifest = {
            'items': [
                {'kind': 'project', 'slug': 'proof-project'},
                {'kind': 'writing', 'slug': 'useful-note'},
                {'kind': 'fairytales', 'slug': 'small-story'},
            ]
        }

    def valid_responses(self, origin: str) -> dict[str, list[tuple[int, str, bytes, dict[str, str]]]]:
        responses = {}
        for route in expected_public_routes(self.manifest):
            request_path = '/portfolio/' if route == '/' else f'/portfolio{route}'
            canonical = origin if route == '/' else f'{origin}{route}'
            responses[request_path] = [(200, 'text/html; charset=utf-8', page(f'{route} title', canonical), {})]
        responses['/portfolio/__portfolio-route-smoke__'] = [
            (404, 'text/html; charset=utf-8', page('Page Not Found | Harley Bartles', origin), {})
        ]
        return responses

    def test_expected_routes_include_indexes_and_manifest_content(self) -> None:
        self.assertEqual(
            expected_public_routes(self.manifest),
            [
                '/',
                '/about',
                '/fairytales',
                '/projects',
                '/writing',
                '/fairytales/small-story',
                '/projects/proof-project',
                '/writing/useful-note',
            ],
        )

    def test_checker_requests_every_known_route_and_custom_unknown_fallback(self) -> None:
        responses: dict[str, list[tuple[int, str, bytes, dict[str, str]]]] = {}
        with serving(responses) as (origin, requests):
            responses.update(self.valid_responses(origin))
            findings = check_public_routes(origin, self.manifest, retries=0)

        self.assertEqual(findings, [])
        self.assertEqual(
            set(requests),
            {
                '/portfolio/',
                '/portfolio/about',
                '/portfolio/fairytales',
                '/portfolio/projects',
                '/portfolio/writing',
                '/portfolio/fairytales/small-story',
                '/portfolio/projects/proof-project',
                '/portfolio/writing/useful-note',
                '/portfolio/__portfolio-route-smoke__',
            },
        )

    def test_checker_rejects_wrong_canonical_and_non_html_known_route(self) -> None:
        responses: dict[str, list[tuple[int, str, bytes, dict[str, str]]]] = {}
        with serving(responses) as (origin, _requests):
            responses.update(self.valid_responses(origin))
            responses['/portfolio/about'] = [(200, 'text/html', page('About', f'{origin}/wrong'), {})]
            responses['/portfolio/writing'] = [(200, 'application/json', b'{}', {})]
            findings = check_public_routes(origin, self.manifest, retries=0)

        self.assertTrue(any('/about' in finding and 'canonical' in finding for finding in findings))
        self.assertTrue(any('/writing' in finding and 'Content-Type' in finding for finding in findings))

    def test_checker_rejects_non_200_redirect_loop_and_github_404_body(self) -> None:
        github_404 = b'<html><head><title>Page not found - GitHub Pages</title></head><body>There is no GitHub Pages site here.</body></html>'
        responses: dict[str, list[tuple[int, str, bytes, dict[str, str]]]] = {}
        with serving(responses) as (origin, _requests):
            responses.update(self.valid_responses(origin))
            responses['/portfolio/about'] = [(503, 'text/html', page('Unavailable', f'{origin}/about'), {})]
            responses['/portfolio/projects'] = [(302, 'text/html', b'', {'Location': '/portfolio/projects'})]
            responses['/portfolio/writing'] = [(200, 'text/html', github_404, {})]
            findings = check_public_routes(origin, self.manifest, retries=0)

        self.assertTrue(any('/about' in finding and 'HTTP 503' in finding for finding in findings))
        self.assertTrue(any('/projects' in finding and 'redirect' in finding.lower() for finding in findings))
        self.assertTrue(any('/writing' in finding and 'GitHub Pages' in finding for finding in findings))

    def test_checker_retries_transient_server_failure(self) -> None:
        responses: dict[str, list[tuple[int, str, bytes, dict[str, str]]]] = {}
        with serving(responses) as (origin, requests):
            responses.update(self.valid_responses(origin))
            responses['/portfolio/about'] = [
                (503, 'text/html', page('Unavailable', f'{origin}/about'), {}),
                (200, 'text/html', page('About', f'{origin}/about'), {}),
            ]
            findings = check_public_routes(origin, self.manifest, retries=1, retry_delay=0)

        self.assertEqual(findings, [])
        self.assertEqual(requests.count('/portfolio/about'), 2)

    def test_manifest_file_shape_matches_library_input(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            manifest_path = Path(temporary) / 'manifest.json'
            manifest_path.write_text(json.dumps(self.manifest), encoding='utf-8')
            loaded = json.loads(manifest_path.read_text(encoding='utf-8'))

        self.assertEqual(expected_public_routes(loaded), expected_public_routes(self.manifest))


if __name__ == '__main__':
    unittest.main()
