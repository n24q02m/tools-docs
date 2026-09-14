## 2026-09-13 - Missing HTTP Security Headers in Cloudflare Pages
**Vulnerability:** The Astro application deployed to Cloudflare Pages is missing basic HTTP security headers (like X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security), leaving it vulnerable to clickjacking, MIME-sniffing, and potential downgrade attacks.
**Learning:** For static sites on Cloudflare Pages, security headers aren't added automatically by the framework or hosting provider by default. They must be explicitly configured via a `_headers` file in the build output directory (`public/` in Astro).
**Prevention:** Always ensure a `public/_headers` file is present in Cloudflare Pages static deployments to enforce essential HTTP security headers.
