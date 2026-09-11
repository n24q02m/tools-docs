## 2024-09-12 - Astro Link Prefetching
**Learning:** This is a static documentation site built with Astro and Starlight. Astro has a built-in prefetch option in `astro.config.mjs` that defaults to disabled. When enabled, Astro automatically injects a client-side router that prefetches links (defaulting to hover). This is a trivial, massive performance win for static sites.
**Action:** When working on Astro static sites without prefetching enabled, setting `prefetch: true` is an immediate, zero-risk "Bolt" optimization.
