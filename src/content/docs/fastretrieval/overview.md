---
title: fastretrieval Overview
description: "Fast multi-model retrieval runtime: ONNX and GGUF embeddings, reranking, and a declarative model contract"
---

`fastretrieval` is a Python runtime for multi-model retrieval: text embeddings and reranking on ONNX Runtime or GGUF (`llama-cpp-python`), with no PyTorch dependency. A declarative model contract lets the built-in Qwen3 reference models and custom models share the same runtime.

## Highlights

- **Local inference**: ONNX Runtime, or GGUF through the `gguf` extra. GPU acceleration is optional and auto-detected (CUDA, DirectML).
- **Model families**: dense, sparse (SPLADE) and late-interaction (ColBERT) text embeddings; image and late-interaction multimodal (ColPali) embeddings with the `image` extra; cross-encoder and yes/no generative reranking.
- **Runtimes**: CPython 3.11 to 3.15. onnxruntime has no Python 3.15 wheel yet, so on 3.15 loading an ONNX model raises an `ImportError` that says so.

## Installation

```sh
# Homebrew (macOS / Linux)
brew install n24q02m/tap/fastretrieval

# Scoop (Windows)
scoop bucket add n24q02m https://github.com/n24q02m/scoop-bucket
scoop install fastretrieval

# PyPI (Python 3.11-3.15)
pip install fastretrieval
```

[Homebrew and Scoop](/install/package-managers/) explains how the tap and the bucket pin each release.

## HTTP server

The `server` extra ships a small ASGI service, so several processes share one model instance instead of each loading its own ONNX/GGUF session:

```bash
pip install "fastretrieval[server]"
fastretrieval-server            # default 127.0.0.1:9800
```

| Route | Purpose |
|---|---|
| `POST /embed` | Embeddings for `input` (a list of strings); `model` takes an alias or a registered model name |
| `POST /rerank` | Relevance scores of `documents` for `query` |
| `GET /health` | Liveness: `{status, version}` |
| `GET /models` | Embed and rerank alias tables |

The container image runs the same server on `0.0.0.0:9800`, with the model cache on a `/data` volume and a `HEALTHCHECK` on `/health`. The HTTP stack (FastAPI, uvicorn, pydantic) comes only with the `server` extra; without it, starting the server fails with the install hint.

Request fields, model aliases, error codes, and the cache and thread settings are in the [fastretrieval README](https://github.com/n24q02m/fastretrieval#http-server).
