# `dumling`

`dumling` is a TypeScript and Zod package for learner-facing linguistic annotation centered on hydrated `lemma`, `surface`, and `selection` DTOs.

This package ships working runtime surfaces for `de`, `en`, and `he`.

`dumling` keeps three linked DTOs separate:

- `Lemma`: the dictionary lemma
- `Surface`: the normalized full form in context
- `Selection`: the exact text the learner highlighted

## Entrypoints

| Import path | Purpose |
| --- | --- |
| `dumling` | Root runtime API: `dumling.de`, `dumling.en`, `dumling.he` |
| `dumling/types` | Public DTO and helper types |
| `dumling/schema` | Runtime schema tree |

## Core idea

Start with a German noun lemma, derive its learner-facing entities, and round-trip it through parsing and IDs.

The `Lemma` is the dictionary lemma:

<!-- README_BLOCK:core-lemma -->

The `Surface` is the normalized full form that the note belongs to:

<!-- README_BLOCK:core-surface -->

The `Selection` is the exact observed highlight in the learner's text:

<!-- README_BLOCK:core-selection -->

## Quickstart

Install the package:

```sh
npm install dumling
```

Minimal end-to-end usage:

<!-- README_BLOCK:quickstart-de -->

`schema.abstract.*` is usable for ontology-level validation, and `schema.de.*`, `schema.en.*`, and `schema.he.*` are the concrete runtime surfaces.

## Concepts / Search Terms

People often look for this package using adjacent terms:

- linguistic annotation
- learner annotation
- lemma and inflection modeling
- surface form normalization
- selection DTOs
- Zod schema registries
- stable linguistic IDs

## Model notes

The public DTO model treats these as independent axes:

- `orthographicStatus`: whether the observed spelling is standard or a typo
- `spellingRelation`: whether a known spelling is canonical or an accepted variant
- `selectionCoverage`: whether the learner highlighted the full surface or only part of it

Selections are always hydrated:

- a `Selection` always contains a `Surface`
- a `Surface` always contains a `Lemma`

## Scope

- Runtime today: `de`, `en`, `he`
- Runtime: `Node >= 20`
- Package format: ESM

For repo development:

- `bun test`
- `bun run build`
- `bun run generate:readme`
