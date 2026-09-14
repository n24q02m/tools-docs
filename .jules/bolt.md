## 2024-05-24 - [Astro Prefetch]
**Learning:** Astro provides a built-in prefetch feature that fetches page resources in the background as the user navigates, resulting in much faster page loads. This feature needs to be explicitly enabled in `astro.config.mjs` using `prefetch: true` or similar configuration. Note that it's important to document the expected behavior in comments when adding this optimization.
**Action:** Always enable Astro prefetch in `astro.config.mjs` to significantly improve navigation performance on static documentation sites when a performance boost is required.
