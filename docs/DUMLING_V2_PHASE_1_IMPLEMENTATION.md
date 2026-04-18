# `dumling` v2 Phase 1 Implementation

## Purpose

This document defines the first implementation phase for the `dumling` v2
rewrite described in [`DUMLING_V2_INTERFACE_SPEC.md`](./DUMLING_V2_INTERFACE_SPEC.md).

Phase 1 is not the full rewrite.

Its job is to prove the new architecture with one end-to-end vertical slice,
land the new internal foundations in the repo, and make later migration work
mechanical instead of speculative.

## Phase 1 Outcome

At the end of Phase 1, the repo should contain a working v2 implementation
slice that demonstrates all major interface decisions:

- split public surfaces for workflow, types, and schema
- universal-first authored ontology
- language-restricted DTO families
- hydrated `Selection`
- explicit `lemmaSubKind`
- plain `ApiResult` failure paths
- DTO-shaped builders
- parse-time validation and narrow normalization

Phase 1 does **not** need to deliver full v1 feature parity or full ontology
coverage.

## Hard Constraints

- Do not derive the public type model from a schema graph.
- Do not preserve the current registry layering as the new primary design.
- Do not rewrite v1 in place.
- Do not block on full language coverage before validating the v2 shape.

Phase 1 should build the new system in parallel with the current codebase, then
use tests to prove the architecture before broader migration.

## Scope

Phase 1 includes:

- new v2 source tree and internal module boundaries
- new canonical DTO types for `Lemma`, `Surface`, and `Selection`
- new internal v2 entrypoint modules corresponding to `dumling`,
  `dumling/types`, and `dumling/schema`
- shared universal ontology primitives
- one concrete language slice: `en`
- one lemma family slice: `Lexeme`
- enough sub-kinds and features to exercise the model realistically
- runtime schemas for the Phase 1 slice
- workflow namespaces: `create`, `convert`, `extract`, `parse`, `describe`,
  `id`
- tests for the new slice

Phase 1 excludes:

- `de` and `he`
- `Morpheme` and `Phraseme`
- full universal ontology coverage
- v1 compatibility shims
- README and package marketing rewrite
- removal of v1 source files

## Vertical Slice Definition

Phase 1 should implement one production-quality slice rather than many partial
stubs.

Recommended slice:

- language: `en`
- lemma kind: `Lexeme`
- lemma sub-kinds: at minimum `VERB` and `NOUN`
- surface kinds: `Lemma`, `Inflection`
- selection orthography states: `Standard`, `Typo`
- spelling relations: `Canonical`, `Variant`
- selection coverage: `Full`, `Partial`

Why this slice:

- `VERB` proves inflectional surfaces
- `NOUN` proves non-identical sub-kind narrowing
- `Typo` and `Partial` prove selection semantics
- `Variant` proves spelling relation orthogonality
- one language keeps the first phase small enough to finish

## Source Layout

Phase 1 should create a new `src/v2/` tree and stop using `src/new/` as the
rewrite target.

Proposed layout:

```text
src/
  v2/
    public/
      index.ts
      types.ts
      schema.ts
    shared/
      result.ts
      language.ts
      discriminators.ts
      descriptors.ts
      normalization.ts
      errors.ts
    ontology/
      universal/
        enums/
        features/
        lemma/
      languages/
        en/
          restrictions/
          features/
          lemma/
    dto/
      lemma.ts
      surface.ts
      selection.ts
      families.ts
    schema/
      universal/
      languages/
        en/
      builders/
    workflow/
      create/
      parse/
      convert/
      extract/
      describe/
      id/
    runtime/
      dumling.ts
```

The existing v1 code in `src/depreacted/` remains untouched during Phase 1
except for build plumbing that is required to compile or test the new tree.

## Package Boundary Strategy

Phase 1 should keep v2 implementation work parallel to the current published
surface.

That means:

- v1 remains the package’s active public implementation during Phase 1
- v2 modules can be built and tested in-repo before package cutover
- final export replacement happens in a later phase after broader coverage lands

In particular, the Phase 1 v2 `dumling`, `dumling/types`, and `dumling/schema`
modules are internal implementation entrypoints in the new source tree, not a
partial public package-export cutover.

This is a rewrite de-risking phase, not the release cutover phase.

## Workstreams

## 1. Foundation

Create the shared low-level building blocks that every other workstream depends
on:

- `ApiResult<T, E>`
- shared error code enums and DTOs
- language literals
- entity discriminators
- descriptor DTOs
- narrow parse normalization helpers

Required Phase 1 normalization rules:

- Unicode normalization
- lowercasing `canonicalLemma` and `normalizedFullSurface`

Phase 1 should not lowercase `spelledSelection`.

Explicitly out of scope for normalization:

- trimming
- whitespace collapsing
- inferred spans or offsets
- speculative canonicalization

## 2. Canonical DTO Families

Implement the new DTO layer directly in TypeScript.

This layer is the source of truth for object shape.

Phase 1 must author concrete leaf DTO families for the implemented slice first,
then layer the public generic aliases over those concrete families.

Required concrete leaf DTO families include at minimum:

- English noun lexeme lemma DTO
- English verb lexeme lemma DTO
- English lemma-surface DTOs for those lemma families
- English inflection-surface DTOs for leaf contexts that admit inflection
- English standard and typo selection DTOs over those surface families

Required DTO family layers:

- `UniversalLemma<LK, LSK>`
- concrete Phase 1 leaf DTO families built as restrictions over universal bases
- `Lemma<L, LK, LSK>`
- `Surface<L, SK, LK, LSK>`
- `Selection<L, OS, SK, LK, LSK>`

The sequencing matters:

- concrete leaf DTO families are the authored public-model substrate
- public generics are typed views over those concrete families
- public generics must not become an independently reconstructed primary model

Required invariants to encode in types where possible:

- `Selection` is always hydrated
- `Surface` always nests `Lemma`
- `Surface` excludes `"Universal"`
- `Selection` excludes `"Universal"`
- `inflectionalFeatures` exists only on inflection surfaces
- `meaningInEmojis` is required

## 3. Universal Ontology Seed

Author a universal ontology seed large enough to support the Phase 1 slice.

This should include:

- universal language and entity enums
- universal lemma kind inventory for the slice
- universal lemma sub-kind inventory for the slice
- universal feature inventory for the slice
- universal feature value enums for the slice

The ontology should be authored in compact reusable structures that concrete
languages can restrict, not duplicated per language.

## 4. English Restrictions

Implement `en` as the first concrete restriction over universal.

This layer should define:

- which Phase 1 lemma sub-kinds are valid in English
- which inherent features are allowed per leaf context
- which inflectional features are allowed per leaf context
- which feature values are allowed per feature
- which leaf contexts admit inflection surfaces

The English slice should prove that language packs are restrictions, not
parallel bespoke systems.

## 5. Schema Generation

Derive runtime Zod schemas from the authored ontology and DTO decisions.

Phase 1 must produce:

- `schema.universal.lemma.lexeme.verb()`
- `schema.universal.surface.inflection.lexeme.verb()`
- `schema.universal.selection.typo.inflection.lexeme.verb()`
- `schema.en.lemma.lexeme.verb()`
- `schema.en.surface.inflection.lexeme.verb()`
- `schema.en.selection.standard.inflection.lexeme.verb()`

Phase 1 should prefer a tree-shaped registry of zero-argument leaf functions.

The schema tree must be statically browsable and must not become the source of
truth for the public type layer.

## 6. Workflow API

Implement the runtime language namespace for `dumling.en`.

Required shape:

```ts
const en = dumling.en;

en.create.lemma(...)
en.create.surface.lemma(...)
en.create.surface.inflection(...)
en.create.selection.standard(...)
en.create.selection.typo(...)

en.convert.lemma.toSurface(...)
en.convert.lemma.toSelection(...)
en.convert.surface.toSelection(...)

en.extract.lemma(...)

en.parse.lemma(...)
en.parse.surface(...)
en.parse.selection(...)

en.describe.as.lemma(...)
en.describe.as.surface(...)
en.describe.as.selection(...)

en.id.encode(...)
en.id.decode(...)
en.id.decodeAs(...)
```

Phase 1 behavior requirements:

- `create.*` consumes trusted DTO-shaped input
- namespace-implied fields are derived from the namespace being called
- `create.*` is not fallible
- `parse.*` validates nested consistency
- `parse.*` rejects known-but-illegal feature keys
- `parse.*` strips ontology-unknown feature keys
- parse fails if inflectional feature stripping empties an inflection bag
- `describe.*` returns descriptor coordinates only
- `convert.*` applies the canonical defaults described in the interface spec
- `id.decode()` returns a tagged result

## 7. ID Layer

Implement a v2-only ID codec for the Phase 1 slice.

Requirements:

- consume canonical v2 DTOs directly
- support `Lemma`, `Surface`, and `Selection`
- preserve distinctions relevant to same-spelling collisions
- use typed decode errors
- avoid introducing a second public DTO model for ID payloads

Phase 1 does **not** need to preserve the current v1 encoding format.

It only needs a coherent v2 encoding that can round-trip the Phase 1 slice.

## 8. Testing

Phase 1 is only complete when the new slice is covered by targeted tests.

Required test categories:

- DTO typing tests
- schema shape and parse tests
- builder tests
- conversion tests
- descriptor tests
- ID round-trip tests
- invalid nested language mismatch tests
- illegal feature-key rejection tests
- unknown feature-key stripping tests
- inflectional-feature empty-after-strip failure tests

Recommended test organization:

```text
tests/v2/
  types/
  schema/
  workflow/
  id/
```

## Implementation Order

Phase 1 should be executed in this order:

1. Create `src/v2/` structure and shared result/error primitives.
2. Implement canonical DTO families and descriptor types.
3. Author universal ontology seed for the chosen slice.
4. Implement English restriction data.
5. Build schema derivation for universal and English.
6. Implement `parse.*` first, because it fixes runtime truth.
7. Implement `create.*`, `convert.*`, `extract.*`, and `describe.*`.
8. Implement v2 ID encode/decode on top of canonical DTOs.
9. Add tests for the slice.
10. Wire internal build/test entrypoints for v2 modules.

The key sequencing rule is:

`parse.*` and the canonical DTO families should exist before convenience helpers.

## Deliverables

Phase 1 should end with these concrete repo outcomes:

- a committed `src/v2/` implementation tree
- a committed v2 test suite for the Phase 1 slice
- a committed internal v2 build path
- a stable internal module boundary between types, schema, and workflow
- no new dependency on `neverthrow`
- no new dependency on schema-derived public typing

## Exit Criteria

Phase 1 is complete when all of the following are true:

- the Phase 1 vertical slice works end to end through `dumling.en`
- `dumling/types` and `dumling/schema` v2 modules exist in the new tree
- type precision is preserved across `lemmaKind` and `lemmaSubKind`
- `Selection` is always hydrated in types and runtime schemas
- `parse.*` returns `ApiResult`
- `create.*` and `convert.*` return plain DTOs
- ID round-trips succeed for the Phase 1 slice
- the Phase 1 tests pass
- no Phase 1 code path depends on v1 registry-derived public typing

## Deferred To Phase 2

Phase 2 can expand coverage after the architecture is proven.

Deferred work includes:

- `de` and `he`
- additional lexeme sub-kinds
- `Morpheme`
- `Phraseme`
- broader universal feature inventory
- package export cutover from v1 to v2
- README and public docs rewrite
- v1 source retirement

## Bottom Line

Phase 1 should not try to finish v2.

It should prove that the v2 model is buildable, testable, and ergonomically
better by landing one complete slice with the correct architecture. If that
slice is clean, later expansion becomes mostly repetition and coverage work
rather than architectural guesswork.
