# `dumling`

## The best parts of computational linguistics with a typesafe API

`dumling` provides types and Zod schemas for learner-facing meaning-focused segmentation.

This package ships working runtime surfaces for `de`, `en`, and `he`.

`dumling` keeps three linked DTOs separate:

- `Lemma`: the dictionary lemma
- `Surface`: the normalized full form in context
- `Selection`: the exact text the learner highlighted

## Entrypoints

| Import path      | Purpose                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `dumling`        | Root runtime API: `dumling.<language>`, `getLanguageApi`, and `supportedLanguages`              |
| `dumling/types`  | Public DTOs, feature helpers, descriptors, and API/result/error types                           |
| `dumling/schema` | Concrete runtime schema registry: `schemasFor` and `getSchemaTreeFor(language)`                 |

## Runtime API

Each concrete language namespace (`dumling.de`, `dumling.en`, `dumling.he`) exposes:

- `create`: explicit constructors for `lemma`, `surface.citation`, `surface.inflection`, `selection.standard`, and `selection.typo`
- `convert`: convenience projections from `lemma -> surface`, `lemma -> selection`, and `surface -> selection`
- `extract`: entity accessors such as `extract.lemma(...)`
- `parse`: safe parsing returning `ApiResult<T, ParseError>`
- `describe`: descriptor helpers via `describe.as.lemma`, `surface`, and `selection`
- `id`: stable ID encode/decode helpers for hydrated DTOs

The root runtime entrypoint also exposes:

- `supportedLanguages`: the curated runtime language inventory
- `getLanguageApi(language)`: dynamic access to a language-bound workflow API

## Public types

`dumling/types` exports:

- DTOs: `Lemma`, `Surface`, `Selection`
- Entity and ID helpers: `EntityValue`, `EntityForKind`, `DumlingCsv`, `DumlingBase64Url`, `SelectionOptionsFor`
- Language-aware helper types: `LemmaKindFor`, `LemmaSubKindFor`, `SurfaceKindFor`, `LemmaKindForSurfaceKind`
- Feature typing helpers: `FeatureSet`, `FeatureName`, `FeatureValue`, `InherentFeaturesFor`, `InflectionalFeaturesFor`
- Descriptors and API shapes: `Descriptor`, `DumlingApi`, `LanguageApi`
- Result and error types: `ApiResult`, `ParseError`, `IdDecodeError`, `IdDecodeSuccess`

## Core idea

Start with a German noun lemma, build the linked learner-facing entities explicitly, and then use the runtime helpers for parsing and IDs.

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

`schemasFor.de.entity.*`, `schemasFor.en.entity.*`, and `schemasFor.he.entity.*` expose concrete Zod schema getters. Leaf calls return Zod schemas for validators, LLM response-schema callers, and other schema-consuming APIs.

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
- `bun run test:package`
- `bun run build`
- `bun run generate:readme`
