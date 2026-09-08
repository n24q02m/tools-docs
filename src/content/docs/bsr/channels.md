---
title: Release channels
description: Beta-first releases and stable promotion
---
bsr releases beta-first:

- **Beta** (`v<major>.<minor>.<patch>-beta.N`): pre-releases carrying new publisher work; consumers opt in explicitly by pinning the beta SHA.
- **Stable** (the current non-prerelease release): the default pin target for consumer workflows. Promotion is deliberate — the release workflow computes the version and the protected environment publishes it.

## Choosing a pin

- Most repos: pin the current **stable** release commit.
- Repos needing the publisher flow: pin the **registry-certified tuple** (release + publish-action at the registry-certified head).
- Exceptions (for example, a targeted fix on fork main) are deliberate and documented beside the pin.

Always read the [current release list](https://github.com/n24q02m/better-semantic-release/releases)
and [registry documentation](/bsr/registry/) before changing a consumer pin.
