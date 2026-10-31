## 2024-10-29 - Prevent Command Injection via GitHub Actions Docs
**Vulnerability:** Risky GitHub Actions interpolation pattern in documentation examples.
**Learning:** Direct interpolation of expressions like `${{ steps.bsr.outputs.link }}` into `run` blocks is an anti-pattern that can lead to command injection if a payload contains unescaped quotes.
**Prevention:** Document safe practices using environment variables instead of direct interpolation.
