---
title: fastretrieval Overview
description: High-performance local text embedding, reranking, and semantic search engine
---

`fastretrieval` is an inference engine designed for local, deterministic vector search, dense embeddings, and cross-encoder reranking.

## Highlights

- **Local Inference**: ONNX runtime with optimized kernels for fast CPU and GPU inference without external API latency.
- **Pretrained Model Pipeline**: Integrated support for Qwen3-Embedding, Qwen3-Reranker, MiniLM, and multilingual models.
- **Zero API Dependency**: Offline-first, self-contained semantic indexing and candidate ranking.
- **MCP Integration**: Exposes MCP tools and CLI subcommands for agentic retrieval workflows.
