# `dumling`

`dumling` is a TypeScript and Zod package for learner-facing linguistic annotation. It models linked `lemma`, `surface`, and `selection` DTOs and generates stable `IDs` for each layer.

`dumling` keeps three linked DTOs separate:

- `Lemma`: the dictionary lemma
- `Surface`: the normalized full form in context
- `Selection`: the exact text the learner highlighted

It currently ships curated registries for `English`, `German`, and `Hebrew`.

## Entrypoints

| Import path | Purpose |
| --- | --- |
| `dumling` | Root convenience exports: `dumling`, `idCodec`, `operation` |
| `dumling/id` | Language-scoped ID encoders, decoders, and ID result types |
| `dumling/operation` | Convert and extract helpers as named exports |
| `dumling/schema` | Runtime Zod schema registries grouped by entity kind |
| `dumling/entities` | Public DTO types for lemmas, surfaces, and selections |

## Core idea

Start with the learner's exact highlighted text:

```text
Mark [gvae] up on it
```

`dumling` lets you describe that note at three levels at once.

The `Lemma` is the dictionary lemma:

<!-- README_BLOCK:story-give-up-lemma -->

The `Surface` is the normalized full form that the note belongs to:

<!-- README_BLOCK:story-gave-up-surface -->

The `Selection` is the exact observed highlight in the learner's text:

<!-- README_BLOCK:story-gvae-selection -->

That is the value of the model at a glance: the learner can select a typo or only part of a multi-token expression, while the deeper linguistic lemma stays stable.

In this example:

- the `Lemma` stays `give up`
- the `Surface` stays `gave up`
- the `Selection` stays `gvae`

As IDs, those same three objects become:

<!-- README_BLOCK:story-give-up-ids -->

That separation is what makes typo handling, spelling variants, phrasal verbs, idioms, and partial highlights fit into one consistent shape.

## Quickstart

Install the package:

```sh
npm install dumling
```

Minimal end-to-end usage with named exports and subpath imports:

<!-- README_BLOCK:quickstart-walk -->

The root export is intentionally small:

- `dumling`: convenience namespace for `idCodec` and `operation`
- `idCodec`: stable IDs for lemmas, surfaces, and selections
- `operation`: convert and extract helpers

Use explicit subpaths for heavier public surfaces:

- `dumling/schema`: Zod schema registries by language and entity kind
- `dumling/entities`: DTO types for lemmas, surfaces, and selections

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

The package models three orthogonal questions on the learner-facing side:

- `orthographicStatus`: whether the observed spelling is standard, a recognized typo, or unknown
- `spellingRelation`: whether a known spelling is canonical or an accepted variant
- `selectionCoverage`: whether the learner highlighted the full surface or only part of it

That means a typo does not have to destroy the deeper classification, and a partial selection does not have to discard the full surface or its lemma.

## Scope

- Languages: `English`, `German`, `Hebrew`
- Runtime: `Node >= 20`
- Package format: ESM

For repo development:

- `bun test`
- `bun run build`
- `bun run generate:readme`
