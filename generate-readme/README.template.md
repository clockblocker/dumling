# `dumling`

Typesafe schemas, types, IDs, and operations for learner-facing linguistic annotation.

`dumling` keeps three linked DTOs separate:

- `Lemma`: the dictionary lemma
- `Surface`: the normalized full form in context
- `Selection`: the exact text the learner highlighted

It currently ships curated registries for `English`, `German`, and `Hebrew`.

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

Minimal end-to-end usage from the public root API:

<!-- README_BLOCK:quickstart-walk -->

The root export is intentionally small:

- `dumling.schemaFor`: Zod schema registries by language and entity kind
- `dumling.operation`: convert and extract helpers
- `dumling.idCodec`: stable IDs for lemmas, surfaces, and selections

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
