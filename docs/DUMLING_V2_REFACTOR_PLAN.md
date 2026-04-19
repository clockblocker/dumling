# `dumling` v2 Refactor Plan

## Purpose

This document translates the v2 interface spec into an implementation plan that
fits the current repository state.

It is intentionally not a restatement of the spec. It focuses on:

- the structural problems that exist in the repo today
- the target internal architecture needed to satisfy the spec
- the order of operations that reduces churn and type breakage

## Current-State Constraints

The plan starts from the code that actually exists now.

### 1. The root runtime already exports the operations path

The package root already exports `src/v2/operations` through `src/index.ts`.

This means the refactor does **not** need a later “switch runtime export from
old API to operations API” step.

Instead, the job is:

- make `src/v2/operations/*` type-clean and spec-aligned
- remove hardcoded language branching and weak casts inside that path
- delete any dead duplication left behind by the refactor

### 2. The public language inventory remains curated in this refactor

The public API should continue to expose:

- `dumling.de`
- `dumling.en`
- `dumling.he`

and `SupportedLanguage` should remain:

```ts
type SupportedLanguage = "en" | "de" | "he";
```

This refactor should reduce registry coupling and make future language-pack
integration cheaper, but it does **not** introduce a public extension mechanism
or promise that adding a new public language requires only one new file.

If a future release adds another curated public language, the curated inventory
may still need explicit updates in public entrypoints and exported types.

### 3. `abstract` is not a concrete language pack

The abstract ontology is first-class, but it is not one more member of the
concrete language-pack registry.

The refactor should therefore keep two separate concepts:

- the abstract ontology contract
- the concrete curated language-pack registry

### 4. Existing stubs must preserve current semantics

`en` and `he` remain curated public stubs.

Their current behavior should be preserved:

- workflow helpers throw `NotImplementedYetError`
- parse/decode helpers return typed `LanguageNotImplemented` results
- schema leaf access throws

The refactor should move this behavior behind descriptor-driven logic rather
than hardcoded special cases.

## Main Problems To Fix

The current v2 implementation has four central issues:

### 1. Public types are hardcoded to German registry trees

`src/v2/public-types.ts` currently derives the public model through
`DeLemmaByKind`, `DeSurfaceByKind`, and
`DeSelectionByOrthographicStatus`.

That couples the public generic surface to the authored German tree shape and
is the main reason the generic operations layer is weakly typed.

### 2. Schema typing is hardcoded to concrete registry structure

`src/v2/schemas/internal-types.ts` and `src/v2/schemas/index.ts` encode German
and stub behavior directly instead of consuming a language-pack contract.

### 3. Feature inventory is duplicated

The abstract feature key/value inventory is maintained separately in:

- `src/v2/types/abstract/features/features.ts`
- `src/v2/schemas/abstract/feature-schemas.ts`

That duplication should be eliminated before deeper pack work.

### 4. German family aggregation duplicates inventories across types and schemas

German lexeme, morpheme, and phraseme aggregation is currently maintained in
parallel central files with repeated subkind lists and union assembly.

That creates avoidable drift risk and makes the registry harder to generalize.

## Target Architecture

## 1. Keep abstract ontology separate and first-class

The ontology remains authored abstract-first.

The abstract layer owns:

- lemma kinds
- abstract lemma subkind relationships
- the full feature inventory
- the widest allowed feature-value space
- the abstract schema tree

Concrete languages narrow this ontology. They do not redefine it.

## 2. Introduce one internal concrete language-pack contract

Add `src/v2/language-packs/contracts.ts` with two coordinated concepts:

- `LanguageTypePack<L>`
- `LanguagePackDescriptor<L>`

`LanguageTypePack<L>` should own the canonical concrete DTO unions for a
language:

- `lemma`
- `surface`
- `selection`

`LanguagePackDescriptor<L>` should own the runtime-facing pack behavior:

- runtime union schemas
- schema tree leaves
- stub handlers
- optional parse/decode hooks where generic helpers are insufficient
- optional ID hooks where generic helpers are insufficient
- stub status and stub handlers

The contract should be defined for concrete curated languages only.

### 2a. Keep type-level and runtime registries split to avoid import cycles

The refactor must keep the type graph and runtime graph intentionally layered.

Concrete rule:

- `public-types.ts` may depend on type-pack maps and ontology types
- `public-types.ts` must **not** depend on runtime descriptor registries
- runtime descriptor registries may depend on schemas and operations helpers
- schema modules must not need to import `LanguageApi` or other public runtime
  surfaces

Recommended shape:

- `src/v2/language-packs/contracts.ts`: shared contract types only
- `src/v2/language-packs/type-packs.ts`: type-only canonical pack map
- `src/v2/language-packs/index.ts`: runtime descriptor registry

This keeps `public-types.ts` decoupled from runtime assembly and prevents a
`public-types -> registry -> schemas/operations -> public-types` cycle.

## 3. Add one central concrete-language registry

Add `src/v2/language-packs/index.ts` as the single registry for:

- `de`
- `en`
- `he`

Core consumers should read from this registry instead of hardcoding language
branches in:

- `src/v2/public-types.ts`
- `src/v2/schemas/internal-types.ts`
- `src/v2/schemas/index.ts`
- `src/v2/operations/*`

The abstract ontology should remain outside this registry.

## 4. Rewrite public type derivation around canonical unions

`Lemma`, `Surface`, `Selection`, and the related helper types should derive
from `LanguageTypePackMap[L]` via union extraction, not by indexing into
nested German registry trees.

Target pattern:

- `Lemma<L, LK, LSK>` derives from `Extract<LanguageTypePackMap[L]["lemma"], ...>`
- `Surface<L, SK, LK, LSK>` derives from `Extract<LanguageTypePackMap[L]["surface"], ...>`
- `Selection<L, OS, SK, LK, LSK>` derives from `Extract<LanguageTypePackMap[L]["selection"], ...>`

This should drive:

- `LemmaKindFor`
- `LemmaSubKindFor`
- `SurfaceKindFor`
- `LemmaKindForSurfaceKind`
- `InherentFeaturesFor`
- `InflectionalFeaturesFor`
- `FeatureNameFor`
- `FeatureValueFor`

## 5. Keep stub languages inside the same contract, but with explicit stub handlers

`en` and `he` should each have descriptors with `status: "stub"`.

Their descriptor API should model the distinct public behaviors explicitly
instead of collapsing everything into a single fallback:

- workflow methods that throw
- parse methods that return `LanguageNotImplemented`
- ID decode methods that return `LanguageNotImplemented`
- schema leaf accessors that throw

## 6. Collapse feature inventory to one source of truth

Add `src/v2/ontology/features/catalog.ts` as the single canonical feature
catalog.

The following should derive from that catalog:

- `AbstractFeatureName`
- `AbstractFeatureValue`
- `AbstractInherentFeatures`
- `AbstractInflectionalFeatures`
- `abstractFeatureAtomSchemas`

The current duplicated feature-key authoring pattern should be removed.

## 7. Replace German central inventories with manifest-driven family catalogs

For German:

- lexemes
- morphemes
- phrasemes

create one manifest per family that records at least:

- subkind key
- inflectability
- lemma leaf module
- bundle/schema factory

The family aggregators should derive from those manifests:

- lemma unions
- surface unions
- selection unions
- schema leaf trees
- runtime union schemas

The goal is to remove repeated central subkind inventories from both types and
schemas.

These manifests should be authored static modules, not runtime-discovered
metadata and not codegen inputs.

Practical rule:

- each manifest entry should point at already-authored leaf exports
- manifests should be `as const` and type-directed
- the refactor should not require dynamic import tricks or reflective registry
  walking

This keeps the manifest step implementable in plain TypeScript and avoids
turning a deduplication refactor into infrastructure work.

## 8. Make the operations layer consume the new contracts directly

`src/v2/operations/*` is already the canonical runtime path.

After the type-pack and descriptor contracts exist, the operations layer should
consume them directly rather than leaning on broad public unions plus casts.

The end state should remove the current weak spots such as:

- broad `Surface<L>` / `Selection<L>` builder returns
- `decodeAs` returning a broad entity union
- `as unknown as` bridges in shared builder paths

## Public API Constraints

The refactor should preserve these public decisions:

- keep the public module split: `dumling`, `dumling/types`, `dumling/schema`
- keep root export names unchanged
- keep `SupportedLanguage` as `"en" | "de" | "he"`
- keep `schema.abstract.*` first-class and browsable
- keep `schema.de.*`, `schema.en.*`, and `schema.he.*` publicly exposed
- keep the existing stub semantics for `en` and `he`
- do not expose language-pack registry implementation details as public API
- do not re-export internal pack contracts or registries from public entrypoints

The refactor may tighten public TypeScript signatures where the current API is
too weak or too broad.

Spec-aligned tightening is explicitly desired for:

- `create.surface.lemma`
- `create.surface.inflection`
- `create.selection.standard`
- `create.selection.typo`
- `id.decodeAs`

## Implementation Sequence

## 1. Add regression coverage first

Expand runtime coverage in `tests/internal/v2-api.test.ts`.

Add compile-only fixtures under `tests/types/` for:

- `Lemma` narrowing by language/kind/subkind
- `Surface` narrowing by surface kind
- `Selection` narrowing by orthographic status and nested surface kind
- feature helper resolution
- exact `id.decodeAs` return typing
- stub behavior
- schema leaf access behavior

These tests should lock behavior before internals move.

To make those fixtures real rather than aspirational, add a dedicated type-test
entrypoint instead of relying on the existing mixed `tsconfig.json` include.

Recommended minimum:

- add `tsconfig.type-tests.json` (or equivalent) that includes `src/**/*.ts`
  plus `tests/types/**/*.ts`
- add a script such as `bun run check:types`
- use plain `.ts` fixtures with positive assertions and `@ts-expect-error`
  negatives

This isolates compile-only guarantees from runtime tests, README examples, and
package-build concerns.

## 2. Stabilize the existing operations path enough to refactor safely

Before larger architectural work, remove the most immediate type holes in the
current `src/v2/operations/*` layer:

- implicit `any` parameters
- broad `decodeAs` typing
- weak builder return signatures where they block later work

This is not the full cleanup pass. It is a baseline pass so the refactor has a
type-checkable target.

## 3. Land the shared feature catalog

Build the feature catalog refactor early and update abstract types and schemas
to consume it.

This is the smallest high-value deduplication step and reduces later blast
radius.

## 4. Introduce the concrete language-pack contracts and registry

Add:

- `src/v2/language-packs/contracts.ts`
- `src/v2/language-packs/index.ts`

Register `de`, `en`, and `he` there.

At this stage:

- `abstract` still lives in the abstract ontology/schema modules
- concrete pack descriptors can wrap the current German/stub implementations
- consumers may still internally delegate to existing German files

## 5. Make schema typing and schema assembly registry-driven

Refactor:

- `src/v2/schemas/internal-types.ts`
- `src/v2/schemas/index.ts`

so they consume the concrete language-pack registry rather than hardcoding:

- German schema trees
- German runtime unions
- `en` / `he` thrower mapping

`schema.abstract` should remain built from the abstract ontology path, not from
the concrete registry.

## 6. Rewrite `src/v2/public-types.ts` around `LanguageTypePackMap`

This is the key decoupling step.

Replace the current German-tree indexing with union extraction from the
canonical type-pack map.

This should also tighten:

- `LanguageApi<L>`
- create helper return types
- descriptor helper return types
- `id.decodeAs`

## 7. Migrate German family aggregation to manifests

Refactor German lexeme, morpheme, and phraseme aggregation so one manifest per
family drives both the type unions and the schema assembly.

Keep existing leaf files initially.

The goal at this step is to remove repeated central inventories, not to
redesign each leaf schema.

## 8. Remove unsafe shared builder patterns

Refactor:

- `src/v2/schemas/shared/builders.ts`
- German bundle builders

so they return precise typed objects without `as unknown as` bridges when
reasonable.

Prefer:

- overloads
- separate helpers for inflectable vs uninflectable cases
- pack-aware generic helpers

Avoid placeholder hacks such as pretending `undefined` is a valid typed branch.

Do not make “zero casts anywhere” a success criterion.

If Zod generic limitations force a small number of local casts at builder
boundaries, that is acceptable provided:

- the cast is localized
- the surrounding public contract remains exact
- the cast is not used to hide a known mismatch in DTO shape

The goal is to remove structural unsoundness, not to spend the project budget
fighting library typing edge cases.

## 9. Make the operations layer descriptor-driven end to end

Once the pack contracts are in place, update:

- create
- convert
- parse
- describe
- extract
- id

to consume registry-backed pack behavior where appropriate.

This is the point where concrete language branching should largely disappear
from operations entrypoints.

## 10. Final cleanup

After `check`, `test`, and `build` are green:

- delete obsolete hardcoded language branches
- remove dead duplication left behind by the pre-registry design
- update README/examples/type fixtures to reflect the tighter public types

## Acceptance Criteria

The refactor is done when all of the following are true:

- `bun run check` passes with no v2 type errors
- dedicated type fixtures pass under the chosen type-test script/config
- `bun test` passes
- `bun run build` passes
- root runtime export still comes from `src/v2/operations`
- `dumling.de` remains runtime-compatible with current tested behavior
- `dumling.en` and `dumling.he` preserve current stub semantics
- `schema.abstract.*` remains first-class and browsable
- `schema.de.*` leaf access still works
- `schema.en.*` and `schema.he.*` still throw at leaf access
- public type fixtures prove exact narrowing for lemma/surface/selection helpers
- `id.decodeAs("Lemma" | "Surface" | "Selection")` returns exact entity families

## Explicit Non-Goals

This refactor does **not** do the following:

- add a public extension mechanism for arbitrary consumer-defined languages
- treat `abstract` as a concrete language pack
- redesign the v2 DTO concepts from the interface spec
- introduce code generation
- promise that future curated public languages can be added with one registry
  entry and no other public-surface changes

## Recommended Working Rule

When a design choice conflicts with authored registry convenience, prefer the
spec-aligned public type model.

The concrete rule for this refactor is:

- type packs are canonical for public DTO families
- descriptors are canonical for runtime pack behavior
- schema authoring must satisfy those contracts
- authored registry tree shape does not get to define the public generic API
