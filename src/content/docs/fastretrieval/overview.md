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

## HTTP server

`fastretrieval` can serve the models it loads, so a caller never needs a second runtime:

```bash
pip install "fastretrieval[server]"
fastretrieval-server            # default 0.0.0.0:9800
```

| Route | Purpose |
|---|---|
| `POST /embed` | Dense embeddings for `input` (string or list) with a model alias |
| `POST /rerank` | Cross-encoder scores + ordering for `query`/`documents` |
| `GET /health` | Liveness plus the loaded model set |
| `GET /models` | Embed and rerank alias tables |

The container image builds the same server (`uv --frozen --extra server`, non-root, `/data` model cache volume, `HEALTHCHECK` on `/health`). The FastAPI/uvicorn dependency is an extra: importing the library never pulls it.
