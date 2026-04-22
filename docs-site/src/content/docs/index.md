---
title: dumling docs
description: Human-readable and agent-friendly documentation for dumling.
order: 0
---

# dumling

`dumling` is a TypeScript and Zod package for learner-facing linguistic annotation centered on hydrated `lemma`, `surface`, and `selection` DTOs.

Use it when an app needs stable, validated objects for dictionary lemmas, observed word forms, learner highlights, and IDs that can round-trip through storage or model workflows.

## Start Here

- [Linguistics](./general/linguistics/) explains the domain terms without TypeScript.
- [Model](./general/model/) describes the DTO shape: `Lemma`, `Surface`, and `Selection`.
- [API](./general/api/) lists the package entrypoints and language-bound helpers.
- [English](./lang/en/), [German](./lang/de/), and [Hebrew](./lang/he/) summarize the implemented language packs.

Every docs route is built as static HTML and also emitted as a sibling Markdown file. For example, this page is available as `/index.html` and `/index.md`.

## Package Entrypoints

| Import path | Purpose |
| --- | --- |
| `dumling` | Runtime workflow API: `dumling.<language>`, `getLanguageApi`, `supportedLanguages`, and `inspectId` |
| `dumling/types` | Public DTO types, feature helpers, descriptors, and API result types |
| `dumling/schema` | Concrete Zod schema registries and abstract schema helpers |

## Quickstart

Build a German noun lemma, derive a surface and selection, validate it, and round-trip it through an ID:

<!-- DOC_BLOCK:quickstart-de -->

## Runtime Scope

The current implemented runtime languages are:

- `en`: English
- `de`: German
- `he`: Hebrew

The language inventory is curated by the package. Consumers can choose a supported language dynamically with `getLanguageApi(language)`, but arbitrary user-defined language packs are not part of the public runtime API.
