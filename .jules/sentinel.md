## 2024-05-24 - [Enforce Security Headers in Cloudflare Pages]
**Vulnerability:** Missing HTTP security headers (e.g., X-Frame-Options, Strict-Transport-Security) in Cloudflare Pages deployment, which could expose the site to clickjacking, MIME-type sniffing, and man-in-the-middle attacks.
**Learning:** Cloudflare Pages natively supports a `_headers` file in the output directory to attach headers to responses. In static site generators like Astro, placing `_headers` in the `public/` directory ensures it gets copied to the build output (`dist/`) unaltered. This is a critical and easy way to enforce defense in depth.
**Prevention:** Always check for or add a `public/_headers` file when setting up a static site deployment (like Cloudflare Pages) to provide baseline HTTP security headers.
