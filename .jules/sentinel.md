## 2026-09-13 - Missing HTTP Security Headers in Cloudflare Pages
**Vulnerability:** The Astro application deployed to Cloudflare Pages is missing basic HTTP security headers (like X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security), leaving it vulnerable to clickjacking, MIME-sniffing, and potential downgrade attacks.
**Learning:** For static sites on Cloudflare Pages, security headers aren't added automatically by the framework or hosting provider by default. They must be explicitly configured via a `_headers` file in the build output directory (`public/` in Astro).
**Prevention:** Always ensure a `public/_headers` file is present in Cloudflare Pages static deployments to enforce essential HTTP security headers.

## 2024-05-24 - Broken Security Headers due to Git Conflict Markers
**Vulnerability:** The `public/_headers` file contained Git merge conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>> origin/main`), which broke the Cloudflare Pages deployment file parser. This caused all critical security and caching headers to be ignored by the platform, leaving the site vulnerable.
**Learning:** Cloudflare Pages' deployment file parser for `_headers` is strict and will silently fail or reject the file if it contains syntax errors like Git conflict markers, dropping all security protections.
**Prevention:** Always verify the syntax and contents of the `_headers` file, especially after resolving Git conflicts, to ensure no markers or invalid syntax remain before deployment.
