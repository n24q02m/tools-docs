## 2026-09-12 - [Missing Security Headers in Cloudflare Pages]
**Vulnerability:** Missing HTTP security headers (e.g., Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security).
**Learning:** Static sites deployed on Cloudflare Pages or similar platforms require explicit configuration via `public/_headers` to enforce browser security mechanisms and defend against XSS, clickjacking, and MIME-type sniffing.
**Prevention:** Always add a `public/_headers` file for static deployments to apply a defense-in-depth security posture.
