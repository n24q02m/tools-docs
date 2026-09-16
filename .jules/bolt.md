## 2024-05-24 - [Astro Prefetch]
**Learning:** Astro provides a built-in prefetch feature that fetches page resources in the background as the user navigates, resulting in much faster page loads. This feature needs to be explicitly enabled in `astro.config.mjs` using `prefetch: true` or similar configuration. Note that it's important to document the expected behavior in comments when adding this optimization.
**Action:** Always enable Astro prefetch in `astro.config.mjs` to significantly improve navigation performance on static documentation sites when a performance boost is required.

## 2024-06-03 - [Cloudflare Pages Caching]
**Learning:** Cloudflare Pages doesn't automatically set optimal long-term caching headers for immutable assets (like Astro's `_astro/` directory assets) by default. This leads to redundant downloads of static JS/CSS on repeat visits.
**Action:** Always add an explicit `public/_headers` file containing a `Cache-Control: public, max-age=31536000, immutable` rule for the `/_astro/*` route when deploying Astro apps to Cloudflare Pages.
