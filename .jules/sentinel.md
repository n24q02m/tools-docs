## 2026-09-13 - Missing HTTP Security Headers in Cloudflare Pages
**Vulnerability:** The Astro application deployed to Cloudflare Pages is missing basic HTTP security headers (like X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security), leaving it vulnerable to clickjacking, MIME-sniffing, and potential downgrade attacks.
**Learning:** For static sites on Cloudflare Pages, security headers aren't added automatically by the framework or hosting provider by default. They must be explicitly configured via a `_headers` file in the build output directory (`public/` in Astro).
**Prevention:** Always ensure a `public/_headers` file is present in Cloudflare Pages static deployments to enforce essential HTTP security headers.

## 2026-09-14 - Git Merge Conflict Markers in Config Files Break Deployment
**Vulnerability:** Git merge conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) left accidentally inside the Cloudflare Pages `public/_headers` file broke the deployment file parser. This rendered critical configurations, including security headers (Content-Security-Policy, X-Frame-Options, etc.) and caching headers, ineffective, exposing the application to vulnerabilities and performance regressions.
**Learning:** Configuration files parsed by deployment providers (like `_headers` for Cloudflare) are extremely sensitive to syntax errors. Unresolved merge conflicts silently break these configurations without necessarily causing build errors in the static site generator itself.
**Prevention:** Always ensure git merge conflict markers are completely resolved and removed from configuration files before committing and deploying. Build steps should ideally include checks for conflict markers in sensitive files.

## 2026-10-24 - Missing rel="noopener noreferrer" on target="_blank" Links
**Vulnerability:** External links configured with `target="_blank"` in the Astro/Starlight sidebar (e.g., in `astro.config.mjs`) do not automatically include `rel="noopener noreferrer"`. This creates a potential "reverse tabnabbing" vulnerability where the newly opened tab can gain a reference to the `window.opener` object and maliciously navigate the original tab to a phishing or malicious site.
**Learning:** Frameworks like Astro/Starlight may not automatically inject security attributes like `rel="noopener noreferrer"` into `attrs` for external links configured with `target: '_blank'`.
**Prevention:** Always explicitly define `rel: 'noopener noreferrer'` in the `attrs` object for any external link configured with `target: '_blank'` in the Astro/Starlight configuration.
