# Model Simplification Audit

## Summary

The repo has already moved partway away from the old `ResolvedSurface` and
`UnresolvedSurface` split, but the architecture still reflects that earlier
model:

- `Selection` still means both a hydrated linguistic selection and an unresolved
  raw observation.
- `Surface` is still treated as if it depends on selection-level orthographic
  state.
- selection, surface, and lemma identity are duplicated across types, schemas,
  and the ID wire format.
- the same ontology is maintained in too many places, and the type system is
  now losing literal specificity.

This document proposes a stricter rewrite:

- `Selection` always contains a `Surface`
- `Surface` always contains a `Lemma`
- unresolved raw text moves out of `Selection` into a separate
  `ObservedSelection`
- authored source of truth becomes `lemma schema + valid surface variant
  definitions`
- hydrated selection schemas are derived mechanically
- redundant surface discriminators are removed from both the model and the next
  wire format revision

This is a breaking cleanup, not a compatibility-first refactor.

## Baseline findings

### 1. `Selection` currently means two different things

Today `Selection` includes both:

- hydrated selections with `surface`
- unresolved objects with `orthographicStatus: "Unknown"` and no `surface`

That forces a parallel `KnownSelection` type in
[src/id/types.ts](/Users/annagorelova/work/dumling/src/id/types.ts) and null
handling in
[src/lu/public-operations.ts](/Users/annagorelova/work/dumling/src/lu/public-operations.ts).

This is the main conceptual mismatch. A type called `Selection` should not mean
both "fully resolved linguistic object" and "raw observed text that failed to
resolve".

### 2. `Surface` is modeled as selection-derived even though it is not

`SurfaceSchema` is reconstructed from `SelectionSchema` in
[src/lu/public-entities.ts](/Users/annagorelova/work/dumling/src/lu/public-entities.ts).
That inverts the actual domain relationship.

The domain is:

1. `Lemma`
2. `Surface`
3. `Selection`

The current architecture effectively stores:

1. `Lemma`
2. `Selection`
3. `Surface` derived back out of `Selection`

That keeps the codebase selection-first even though the real invariant is now
surface-first.

### 3. `surface.discriminators` is redundant

The surface currently stores:

- nested `lemma`
- `discriminators.lemmaKind`
- `discriminators.lemmaSubKind`

Those fields duplicate data already present inside the nested lemma. The
duplication is validated in
[src/lu/universal/factories/buildSelectionSurface.ts](/Users/annagorelova/work/dumling/src/lu/universal/factories/buildSelectionSurface.ts)
and serialized again in
[src/id/internal/codec/encode.ts](/Users/annagorelova/work/dumling/src/id/internal/codec/encode.ts).

This is not useful redundancy. It increases type friction and lets the model
carry contradictory state unless every boundary revalidates it.

### 4. The wire format duplicates lemma identity inside surfaces

The ID codec serializes:

- `surfaceKind`
- `lemmaKind`
- `lemmaSubKind`
- the full nested lemma payload

`surfaceKind` remains real surface-level data. For inflection surfaces,
inflectional features are also real surface-level data. The redundant part is
the lemma identity duplicated as `lemmaKind` and `lemmaSubKind` alongside the
nested lemma payload. Decode reconstructs the same duplicated shape in
[src/id/internal/codec/decode.ts](/Users/annagorelova/work/dumling/src/id/internal/codec/decode.ts).

If the canonical model says lemma identity comes from nested lemma data, the
wire format should eventually say the same. Otherwise the redundancy just moves
down one layer.

Note: this is a versioned wire-format decision. If Dumling IDs must remain
stable, this belongs in a `v2` format rather than a silent payload change.

### 5. The current type architecture is losing literal specificity

`bun test` passes, but `bun run check` currently fails. The failures show that
language and subkind literals widen across the public unions. One visible case
is
[tests/helpers/functions/builders.ts](/Users/annagorelova/work/dumling/tests/helpers/functions/builders.ts),
which accepts `language: TargetLanguage` instead of preserving a language
literal.

This is not just a helper bug. It is a sign that the current public type graph
is too reconstructive and too union-heavy.

### 6. Too much authored registry fan-out

The lexeme registries in:

- [src/lu/language-packs/english/lu/lexeme/english-lexemes.ts](/Users/annagorelova/work/dumling/src/lu/language-packs/english/lu/lexeme/english-lexemes.ts)
- [src/lu/language-packs/german/lu/lexeme/german-lexemes.ts](/Users/annagorelova/work/dumling/src/lu/language-packs/german/lu/lexeme/german-lexemes.ts)
- [src/lu/language-packs/hebrew/lu/lexeme/hebrew-lexemes.ts](/Users/annagorelova/work/dumling/src/lu/language-packs/hebrew/lu/lexeme/hebrew-lexemes.ts)

repeat the same structure four times per language:

- standard lemma selection
- standard inflection selection
- typo lemma selection
- typo inflection selection

That duplication should not survive the rewrite.

### 7. `spellingRelation` is semantically underdefined

Schemas currently allow `spellingRelation` to be omitted, while the codec
normalizes missing to `"Canonical"` in
[src/id/internal/codec/encode.ts](/Users/annagorelova/work/dumling/src/id/internal/codec/encode.ts).

That leaves the public model ambiguous:

- is canonical spelling explicit data?
- or is it an implied default?

The rewrite should choose one rule and enforce it consistently.

## Revised target model

### Canonical entities

```ts
type Lemma<L, LK, D> = ...

type Surface<
  L,
  SK extends SurfaceKind,
  LK extends LemmaKindForSurfaceKind<SK>,
  D
> = {
  language: L;
  normalizedFullSurface: string;
  surfaceKind: SK;
  lemma: Lemma<L, LK, D>;
} & (SK extends "Inflection"
  ? { inflectionalFeatures: Partial<AbstractFeatures> }
  : {});

type Selection<
  L,
  OS extends "Standard" | "Typo",
  SK extends SurfaceKind,
  LK extends LemmaKindForSurfaceKind<SK>,
  D
> = {
  language: L;
  orthographicStatus: OS;
  selectionCoverage: "Full" | "Partial";
  spelledSelection: string;
  spellingRelation: "Canonical" | "Variant";
  surface: Surface<L, SK, LK, D>;
};

type ObservedSelection<L> = {
  language: L;
  orthographicStatus: "Unknown";
  spelledSelection: string;
};
```

### Non-negotiable invariants

- `Selection` is always hydrated.
- `Surface` always contains a `Lemma`.
- `ObservedSelection` is not a `Selection`.
- `ObservedSelection` keeps an explicit `"Unknown"` discriminant for narrowing
  and migration compatibility.
- `Surface` does not carry selection-only metadata.
- `Inflection` surfaces may only wrap `Lexeme` lemmas.

That last rule is already encoded today in
[src/lu/registry-shapes.ts](/Users/annagorelova/work/dumling/src/lu/registry-shapes.ts)
and must remain explicit in the rewritten generics. The simplified API must not
permit impossible states like an inflected phraseme surface.

## What should be authored vs derived

### Authored source of truth

The rewrite should not replace one redundant authored layer with another.

The authored data should be:

- lemma schema
- valid surface variants for that lemma

That is all.

### Derived mechanically

The following should be derived:

- hydrated `Selection` schemas for `Standard`
- hydrated `Selection` schemas for `Typo`
- public selection registries
- runtime unions used by the codec

This means "bundle-first" should be interpreted narrowly:

- a bundle owns lemma schema plus valid surface variants
- selection schemas are derived from those

Not:

- lemma schema
- surface schema
- selection schema

If selection schemas are still authored bundle members, the rewrite has not
actually removed the extra layer.

### Authored surface-variant DSL

Before coding, the rewrite should define the exact authored shape for valid
surface variants. The minimum authored DSL should encode:

- `surfaceKind`
- allowed lemma kind for that surface kind
- optional inflection feature schema
- optional surface-level extra fields

Conceptually:

```ts
type SurfaceVariantDefinition<
  SK extends SurfaceKind,
  LK extends LemmaKindForSurfaceKind<SK>,
> = {
  surfaceKind: SK;
  lemmaKind: LK;
  extraShape?: z.ZodRawShape;
} & (SK extends "Inflection"
  ? { inflectionalFeaturesSchema: z.ZodTypeAny }
  : {});
```

Rules:

- `"Inflection"` variants must require `lemmaKind: "Lexeme"`
- `"Lemma"` variants may allow `Lexeme | Morpheme | Phraseme`
- selection schemas must be derived from these variant definitions, not authored
  separately

The important part is that the `Inflection -> Lexeme` constraint lives in the
DSL itself, not only in downstream registry typings.

## Public API changes

### Type exports

Keep:

- `Lemma`
- `Surface`
- `Selection`

Add:

- `ObservedSelection`

Remove:

- `KnownSelection`

This is a larger public API break than a type rename. It also changes root
exported schema topology and public assumptions in:

- [src/index.ts](/Users/annagorelova/work/dumling/src/index.ts)
- [src/id/public.ts](/Users/annagorelova/work/dumling/src/id/public.ts)
- [tests/internal/public-api.test.ts](/Users/annagorelova/work/dumling/tests/internal/public-api.test.ts)

### Root API behavior

In [src/lu/public-operations.ts](/Users/annagorelova/work/dumling/src/lu/public-operations.ts):

- `extract.surface.fromSelection(selection)` becomes total and returns
  `selection.surface`
- the `null` branch is removed
- any helper that accepts unresolved text should operate on
  `ObservedSelection` explicitly

### Schemas

Target registry shape:

```ts
schemaFor.Lemma[language][lemmaKind][subkind]
schemaFor.Surface[language][surfaceKind][lemmaKind][subkind]
schemaFor.Selection[language][orthographicStatus][surfaceKind][lemmaKind][subkind]
schemaFor.ObservedSelection[language]
```

Important:

- `SurfaceSchema` is status-agnostic
- only hydrated `SelectionSchema` is keyed by orthographic status
- unknown raw text is no longer inside `SelectionSchema`
- `schemaFor.Surface.<language>.Standard|Typo` disappears as a public path

### Codec

`idCodec` should accept:

- `Lemma`
- `Surface`
- hydrated `Selection`

It should not accept:

- `ObservedSelection`

That exclusion should be visible both in types and runtime behavior.

## Builder and factory requirements

### Literal preservation is mandatory

The new builders must preserve literals using generics or const generics for:

- language
- surface kind
- lemma kind
- lemma subkind

If the new builders widen these values early, the repo will recreate the same
typecheck failures under cleaner names.

This is a design requirement, not a polish task.

### Factory direction

Delete the selection-first surface builder in
[src/lu/universal/factories/buildSelectionSurface.ts](/Users/annagorelova/work/dumling/src/lu/universal/factories/buildSelectionSurface.ts).

Replace the current factory stack with:

1. `defineLemmaSchema(...)`
2. `defineSurfaceSchemas(...)`
3. `deriveSelectionSchemas(...)`

The old split across:

- `buildSelectionSurface`
- `buildKnownSelection`
- `buildLemmaSelection`
- `buildInflectionSelection`

should be collapsed around authored surface definitions plus derived hydrated
selection wrappers.

## Wire format recommendation

### Short term

Short term, the codec can keep the current payload if stability is required.

### Target

The target wire format should remove redundant lemma discriminators from
surfaces and derive lemma identity from nested lemma data.

That means a future revision should avoid serializing both:

- surface-level lemma discriminators
- the full nested lemma payload

If the canonical model no longer contains `surface.discriminators`, a new wire
format should not reintroduce them.

## Spelling relation decision

The rewrite should make `spellingRelation` explicit required data on hydrated
`Selection`.

Recommended rule:

- canonical `Selection` values must contain `spellingRelation: "Canonical"`
- constructors may provide the default automatically
- schemas, runtime helpers, and codecs should all treat it as required once the
  object exists

This is preferable to continuing the current hybrid model where omission is
allowed but silently normalized later.

## Files most affected

### Core model

- [src/lu/public-entities.ts](/Users/annagorelova/work/dumling/src/lu/public-entities.ts)
- [src/lu/registry-shapes.ts](/Users/annagorelova/work/dumling/src/lu/registry-shapes.ts)
- [src/lu/public-operations.ts](/Users/annagorelova/work/dumling/src/lu/public-operations.ts)
- [src/lu/internal/operations/shared.ts](/Users/annagorelova/work/dumling/src/lu/internal/operations/shared.ts)
- [src/lu/universal/abstract-selection.ts](/Users/annagorelova/work/dumling/src/lu/universal/abstract-selection.ts)
- [src/lu/universal/ling-id-schema-compat.ts](/Users/annagorelova/work/dumling/src/lu/universal/ling-id-schema-compat.ts)

### Factories

- [src/lu/universal/factories/buildSelectionSurface.ts](/Users/annagorelova/work/dumling/src/lu/universal/factories/buildSelectionSurface.ts)
- [src/lu/universal/factories/buildKnownSelection.ts](/Users/annagorelova/work/dumling/src/lu/universal/factories/buildKnownSelection.ts)
- [src/lu/universal/factories/buildLemmaSelection.ts](/Users/annagorelova/work/dumling/src/lu/universal/factories/buildLemmaSelection.ts)
- [src/lu/universal/factories/buildInflectionSelection.ts](/Users/annagorelova/work/dumling/src/lu/universal/factories/buildInflectionSelection.ts)

### Codec

- [src/id/types.ts](/Users/annagorelova/work/dumling/src/id/types.ts)
- [src/id/internal/guards.ts](/Users/annagorelova/work/dumling/src/id/internal/guards.ts)
- [src/id/internal/codec/encode.ts](/Users/annagorelova/work/dumling/src/id/internal/codec/encode.ts)
- [src/id/internal/codec/decode.ts](/Users/annagorelova/work/dumling/src/id/internal/codec/decode.ts)

### Registry fan-out

- all `src/lu/language-packs/**` registry files

## Migration order

0. Fix or isolate the current literal-widening baseline so `bun run check` can
   evaluate the refactor meaningfully. Start with helper paths like
   [tests/helpers/functions/builders.ts](/Users/annagorelova/work/dumling/tests/helpers/functions/builders.ts)
   and any builder signatures that widen language or subkind literals. The
   current failure surface also reaches:
   [tests/helpers/attested-entities/de/selections.ts](/Users/annagorelova/work/dumling/tests/helpers/attested-entities/de/selections.ts),
   [tests/internal/german-non-lexeme.test.ts](/Users/annagorelova/work/dumling/tests/internal/german-non-lexeme.test.ts),
   and
   [tests/external/ling-id/ling-id-public.test.ts](/Users/annagorelova/work/dumling/tests/external/ling-id/ling-id-public.test.ts).
1. Introduce `ObservedSelection` with `orthographicStatus: "Unknown"` and
   redefine hydrated `Selection` so it always contains `surface`.
2. Remove `KnownSelection` from the public type layer.
3. Make `extract.surface.fromSelection` total.
4. Redefine `Surface` as status-agnostic and remove `surface.discriminators`.
5. Define the authored surface-variant DSL explicitly.
6. Replace selection-first factories with authored surface definitions and
   derived hydrated selection wrappers.
7. Rebuild registries so authored data is `lemma schema + surface variant
   definitions`, not `lemma + surface + selection`.
8. Update codec typing to exclude `ObservedSelection`.
9. Decide whether the wire payload changes now or in a future `v2`.
10. Rewrite tests, root API assertions, and README to reflect the new meaning
    of `Selection` and the new schema topology.

## Acceptance criteria

### Functional

- hydrated selections always have a surface
- surfaces always have a lemma
- unresolved raw text uses `ObservedSelection`
- `extract.surface.fromSelection` is total
- `idCodec` rejects `ObservedSelection`

### Structural

- `SurfaceSchema` is no longer derived from `SelectionSchema`
- selection schemas are derived mechanically from authored surface definitions
- `surface.discriminators` no longer exists in the canonical model
- `ObservedSelection` keeps `orthographicStatus: "Unknown"` as its explicit
  discriminant
- literal-preserving builders prevent widening of language and subkind literals

### Verification

- `bun test` passes
- `bun run check` passes
- README and public examples match the new model

## Bottom line

The useful simplification is not just "remove two old type names". The bigger
win is to realign the whole repo around the actual domain chain:

```text
ObservedSelection? -> Selection -> Surface -> Lemma
```

Where:

- `ObservedSelection` is raw user text with no linguistic resolution, but keeps
  `orthographicStatus: "Unknown"` as an explicit discriminant
- `Selection` is always resolved
- surface variants are authored independently of selection status
- `Lemma` is the root identity

If the rewrite stops short of that, the type surface may look cleaner while the
same redundancy and widening problems remain underneath.
