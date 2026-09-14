## 2024-05-24 - [Astro Prefetch]
**Learning:** Astro provides a built-in prefetch feature that fetches page resources in the background as the user navigates, resulting in much faster page loads. This feature needs to be explicitly enabled in `astro.config.mjs` using `prefetch: true` or similar configuration. Note that it's important to document the expected behavior in comments when adding this optimization.
**Action:** Always enable Astro prefetch in `astro.config.mjs` to significantly improve navigation performance on static documentation sites when a performance boost is required.

## 2024-09-14 - [Cloudflare Pages Astro Assets Caching]
**Learning:** Cloudflare Pages does not automatically apply far-future `Cache-Control` headers to Astro's immutable assets (JS, CSS, images) located in the `_astro/` directory. This means returning users might re-fetch these assets unnecessarily, slowing down page loads.
**Action:** When deploying Astro to Cloudflare Pages, always explicitly configure a far-future cache header (`Cache-Control: public, max-age=31536000, immutable`) for the `/_astro/*` path in the `public/_headers` file.
