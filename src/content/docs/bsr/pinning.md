---
title: Action pinning
description: How to pin bsr actions safely and keep bots useful
---
Third-party GitHub Actions should be pinned to a full commit SHA. For bsr, record
the release version beside it:

```yaml
uses: n24q02m/better-semantic-release@<40-char-sha>  # <release-version>
```

- The SHA fixes the exact code; the trailing version comment is what Renovate/Dependabot parse.
- The **main action** (`better-semantic-release@…`) computes the release. The separate
  **publish-action** is the OCI-container publisher that creates the GitHub release and uploads assets.
- Consumers of the publish path should also verify the publisher image digest — see
  [Action-pin registry](/bsr/registry/).

## Accepted pin policy

A consumer is closed only when every bsr callsite pins an explicitly reviewed member
of the accepted set: the current stable release pin, a registry-certified beta tuple
when publisher changes are needed, or a deliberate fork-main fix pin documented
beside the callsite. Read the [live releases](https://github.com/n24q02m/better-semantic-release/releases)
and [registry record](https://github.com/n24q02m/better-semantic-release/releases) before
copying a value; examples in this portal are intentionally not release identity proof.
