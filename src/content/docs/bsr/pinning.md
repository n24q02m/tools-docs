---
title: Action pinning
description: How to pin bsr actions safely and keep bots useful
---
Third-party GitHub Actions should be pinned to a full commit SHA. For bsr, record the version beside it:

```yaml
uses: n24q02m/better-semantic-release@274ef643f3758549bc9e2c616505bd1c32a83409  # v1.5.0
```

- The SHA fixes the exact code; the `# v1.5.0` comment is what Renovate/Dependabot parse — without it the bot can only offer opaque digest updates.
- The **main action** (`better-semantic-release@…`) computes the release. The separate **`publish-action`** (`better-semantic-release/publish-action@…`) is the OCI-container publisher that creates the GitHub release and uploads assets.
- Consumers of the publish path should also verify the publisher image digest — see [Action-pin registry](/bsr/registry/).

## Accepted pins

A consumer is "closed" when every bsr callsite pins a member of the accepted set — today: stable `274ef643  # v1.5.0`, the G1 registry tuple `096ba88  # v1.6.0-beta.8`, or the fork-main `201fef0b` fix pin where required.
