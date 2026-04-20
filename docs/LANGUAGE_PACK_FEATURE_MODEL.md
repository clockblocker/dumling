# Language-Pack Feature Model

## Purpose

This document proposes a refactor of the concrete language-pack type layout so
that each `(language, lemmaKind, lemmaSubKind)` context owns one canonical
feature artifact.

That artifact is `features.ts`.

It should define both feature bags:

- `inherent`
- `inflectional`

Everything else should derive from those files:

- internal helper types
- public helper types
- language feature registries
- generic entity typing

This is a type-first design. Schemas are optional downstream add-ons.

## Status

Draft.

## Problem

The current model spreads concrete feature narrowing across multiple places:

- abstract feature atoms in the ontology
- language-local shared aliases
- POS-specific narrowing inside bundle-adjacent files
- public helper types derived indirectly from lemma and surface types

That creates two kinds of friction:

- ownership is unclear
- feature authoring is not organized around the real domain shape:
  `language / lemmaKind / lemmaSubKind`

The result is that a reader has to reconstruct the feature model from several
layers instead of looking in one place.

## Goals

- make one `features.ts` file the canonical feature definition for each
  concrete context
- keep those files self-contained and free from non-abstract feature aliases
- derive one unified feature-set-aware helper API from those files
- make generic entity types consume the feature API directly
- normalize all languages, including Hebrew, during the same refactor
- remove the old unified feature helper API

## Non-Goals

- full grammar-validating feature combinations
- making schemas canonical
- preserving the current inconsistent narrowing patterns
- introducing an extra layer of language-local aliases like `DeGender`,
  `DeCase`, or `DeNumber` in the new model

## Design Boundary

This model is intentionally a guardrail model, not a full grammatical
licensing system.

The canonical feature bags should answer:

- which feature keys exist in this context
- which value domains each key allows

They do not need to encode every valid cross-feature combination.

A flat feature bag is acceptable even if some linguistically invalid
combinations still type-check.

## Core Decision

For each concrete context, the canonical authored artifact is:

```ts
export type DeNounFeatures = {
	inherent: {
		...
	};
	inflectional: {
		...
	};
};
```

This replaces the idea that the source of truth is a pair of separately named
bag types or a unified `FeatureValueFor` lookup.

The source of truth is the whole context-local `...Features` type.

## Canonical Shape

In the new model, `features.ts` should be self-contained and import only
abstract feature-related types.

For example:

```ts
import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type DeNounFeatures = {
	inherent: {
		gender?: Extract<AbstractFeatureValue<"gender">, "Fem" | "Masc" | "Neut">;
		hyph?: AbstractFeatureValue<"hyph">;
	};
	inflectional: {
		case?: Extract<AbstractFeatureValue<"case">, "Acc" | "Dat" | "Gen" | "Nom">;
		number?: Extract<AbstractFeatureValue<"number">, "Plur" | "Sing">;
	};
};
```

This file should not depend on language-local aliases such as:

- `DeGender`
- `DeCase`
- `DeNumber`

Those belong to the old shaping idea and should not survive into this model.

## Proposed Structure

The structure should mirror the domain:

```text
src/types/language-packs/
  de/
    lexeme/
      noun/
        features.ts
      auxiliary/
        features.ts
    morpheme/
      ...
    phraseme/
      ...
```

The important thing is not singular vs plural naming. The important thing is
that each concrete context gets one canonical `features.ts`.

## Ownership Rules

### 1. `features.ts` owns feature truth

For each concrete context, `features.ts` is the only authored source of truth
for concrete feature narrowing.

It owns:

- inherent feature keys
- inherent feature value domains
- inflectional feature keys
- inflectional feature value domains

It should not depend on:

- language-local feature alias files
- schema objects

### 2. registries derive from `features.ts`

Type registries should be assembled from the exported `...Features` types from
all concrete contexts.

For example:

```ts
type FeatureDefinition = {
	inherent: Record<string, unknown>;
	inflectional: Record<string, unknown>;
};

type LanguagePackFeatureRegistry = {
	de: {
		Lexeme: {
			NOUN: DeNounFeatures;
			AUX: DeAuxiliaryFeatures;
		};
	};
	en: {
		...
	};
	he: {
		...
	};
};
```

This registry is not a separate authored feature model. It is just the
indexing layer built from `features.ts` files.

The bag-kind axis is not a top-level registry key. It lives inside each leaf
feature definition:

```ts
type DeNounFeatures = {
	inherent: { ... };
	inflectional: { ... };
};
```

### 3. helper types derive from the registry

The public and internal feature helper API should be derived from the registry.

Supported helpers:

- `FeatureSetKind`
- `FeatureSet<...>`
- `FeatureName<...>`
- `FeatureValue<...>`

Removed helpers:

- `FeatureNameFor<L, LK, LSK>`
- `FeatureValueFor<L, LK, LSK, F>`

### 4. generic entity types consume helper types directly

The model does not need per-context bundle aliases.

Once the generic helper interface exists, `Lemma`, `Surface`, and `Selection`
typing should consume the feature API directly.

That is the correct dependency direction:

- `features.ts` defines the context
- the registry and generic feature API derive from it
- generic entity typing consumes the generic feature API directly

## Public API Direction

The supported internal and external feature API should use one generic helper
family parameterized by feature-set kind.

Example shape:

```ts
export type FeatureSetKind = "inherent" | "inflectional";

export type FeatureSet<
	L extends SupportedLanguage,
	K extends FeatureSetKind,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = LanguagePackFeatureRegistry[L][LK][LSK][K];

export type FeatureName<
	L extends SupportedLanguage,
	K extends FeatureSetKind,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = keyof FeatureSet<L, K, LK, LSK>;

export type FeatureValue<
	L extends SupportedLanguage,
	K extends FeatureSetKind,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
	F extends FeatureName<L, K, LK, LSK>,
> = FeatureSet<L, K, LK, LSK>[F];
```

This feature-set-aware API should fully replace the old lookup model.

## Schema Contract

Schemas are optional add-ons to the package.

The rules are:

- types are canonical
- schemas are authored assuming the types already exist
- schemas must satisfy generic schema-facing type contracts
- schemas do not define the public type model

This proposal does not require eliminating all duplication in schema authoring.
It only requires preserving the dependency direction:

- type model first
- schema model second

## Consequences

### Benefits

- each context has one obvious place to author feature truth
- the model sheds an unnecessary per-context bundle layer
- the feature API becomes smaller and more regular for internal and external
  consumers
- Hebrew inconsistency disappears as part of the refactor
- no extra language-local alias layer is needed

### Trade-Offs

- some invalid feature combinations may still type-check
- direct `Extract<AbstractFeatureValue<...>, ...>` usage repeats narrowing
  locally instead of centralizing language-local aliases
- registries still need to be assembled explicitly in TypeScript

That last trade-off matters: TypeScript will not automatically discover all
`features.ts` files. A registry file must be authored deliberately.

## Migration Strategy

### Phase 1. Create `features.ts` for each concrete context

For each current context, create a canonical `...Features` type with:

- `inherent`
- `inflectional`

Begin with lexeme contexts.

### Phase 2. Normalize Hebrew during the same refactor

Hebrew should move into the same model during this refactor.

The old inline style should be deleted, not preserved beside the new system.

### Phase 3. Build feature registries from those files

Create the explicit registry layer that indexes all `...Features` types by:

- language
- lemma kind
- lemma sub-kind

### Phase 4. Rebuild public helper types

Derive:

- `FeatureSetKind`
- `FeatureSet`
- `FeatureName`
- `FeatureValue`

Remove:

- `FeatureNameFor`
- `FeatureValueFor`

### Phase 5. Make generic entity typing consume the new model

Update generic `Lemma`, `Surface`, and `Selection` typing so they consume the
new feature API directly.

Per-context bundle aliases should be removed instead of migrated.

## Open Questions

- exact naming and placement of registry files
- whether some contexts should use an explicitly empty `inflectional` or
  `inherent` bag
- whether the abstract helper type should remain named `AbstractFeatureValue`
  or be renamed in a later cleanup

## Recommended Decision

Adopt the context-local `...Features` type as the canonical concrete
language-pack feature model.

Specifically:

- author one `features.ts` per concrete context
- keep those files self-contained and abstract-feature-based
- derive registries from those files
- derive `FeatureSetKind`, `FeatureSet`, `FeatureName`, and `FeatureValue`
  from those registries
- remove `FeatureNameFor` and `FeatureValueFor`
- remove per-context bundle aliases and let generic entity typing consume the
  feature API directly
- normalize Hebrew during the same refactor
