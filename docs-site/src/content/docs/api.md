---
title: API
description: Runtime API namespaces and package entrypoints.
order: 20
---

# API

Each concrete language namespace (`dumling.de`, `dumling.en`, `dumling.he`) exposes:

- `create`: explicit constructors for lemmas, surfaces, and selections
- `convert`: convenience projections between linked DTOs
- `extract`: entity accessors
- `parse`: safe parsing returning `ApiResult<T, ParseError>`
- `describe`: descriptor helpers
- `id`: stable ID encode/decode helpers for hydrated DTOs

The root runtime entrypoint also exposes:

- `supportedLanguages`
- `getLanguageApi(language)`
- `inspectId(id)`
