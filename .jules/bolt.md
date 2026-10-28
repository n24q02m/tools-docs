## 2024-05-20 - Astro Prefetch Strategy
**Learning:** Astro's built-in prefetch feature (`prefetch: true` in `astro.config.mjs`) defaults to the 'hover' strategy. For static documentation sites, this may not be aggressive enough to provide the fastest perceived navigation performance.
**Action:** Configure prefetch to use the 'viewport' strategy (`prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }`) to aggressively preload links as they scroll into view.
