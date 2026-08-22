from __future__ import annotations

import unittest

from tools import check_link_hygiene, refresh_seo_files


class SeoRouteTests(unittest.TestCase):
    def test_cv_is_registered_once_in_every_seo_route_authority(self) -> None:
        for build_routes in (refresh_seo_files.build_routes, check_link_hygiene.build_routes):
            routes = build_routes()
            self.assertEqual(sum(route == '/cv' for route in routes), 1)


if __name__ == '__main__':
    unittest.main()
