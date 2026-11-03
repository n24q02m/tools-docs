---
title: sillstone Overview
description: Pure-Rust zero-dependency multimedia, hashing, and array computing suite
---

`sillstone` is a multi-language performance toolkit built on a pure-Rust workspace of 24 crates with zero C-runtime dependencies. It provides consistent, cross-platform multimedia codecs, cryptographic digests, array operations, and archive processing across 5 programming languages:

1. **Rust**: 24 modular crates on [crates.io](https://crates.io/crates/sillstone-digest).
2. **Python**: Native C-extension wheel on [PyPI](https://pypi.org/project/sillstone/).
3. **Node.js**: N-API native prebuilds package on [npm](https://www.npmjs.com/package/sillstone).
4. **Java**: High-performance JNI bindings published under `io.github.n24q02m:sillstone`.
5. **Go**: CGo bindings available via Go module `github.com/n24q02m/sillstone/sdk/go`.

## Codec & Digest Suite

- **Digests**: SHA-2, SHA-3, BLAKE3, HighwayHash, Murmur3, xxHash, CRC32.
- **Audio & Video Codecs**: FLAC, MP3, MP4 demuxing, H.264 NAL parsing.
- **Image Codecs**: PNG, JPEG, QOI, WebP inspection.
- **Archive & Container Formats**: ZIP, TAR (PAX compliant), PDF parsing, CDC (Content-Defined Chunking).
