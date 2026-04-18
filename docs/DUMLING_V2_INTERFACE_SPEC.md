# `dumling` v2 Interface Spec

## Purpose

This document defines the target public interface for a ground-up `dumling`
v2 rewrite in TypeScript.

The goal is not to preserve the current internal structure. The goal is to
preserve the linguistic concepts while replacing the current public surface
with a cleaner, stricter, more coherent API.

## Status

Draft.

This is a target-interface document, not an implementation plan. It defines
the intended v2 public surface and the design constraints the new internals
must satisfy.

## Why Rewrite Now

This spec assumes a full internal rewrite is acceptable.

That is a reasonable choice because `dumling` is still effectively greenfield:

- there is no large downstream dependency surface to preserve
- the package is not yet locked into a mature compatibility burden
- the current moment is still early enough to change the model cleanly

The point of v2 is not incremental cleanup for its own sake. The point is to
replace the current internal architecture before it hardens into long-term
public debt.

## Rewrite Motivation

The rewrite is motivated by practical use of the library, not by abstract
architectural preference.

Working with the current package surface in real consumer code exposed repeated
friction:

- public concepts are split across too many adjacent APIs
- internal registry structure leaks into the caller experience
- the model is harder to use than the underlying linguistic ideas deserve
- downstream usage keeps running into avoidable rough edges

One specific lesson from v1 is that inferring the public type model from the
schema graph was a bait-and-headache design.

That approach made the type surface harder to reason about, harder to control,
and too dependent on the exact structure of authored schema registries.

v2 explicitly moves away from that failed direction:

- types are the canonical model
- concrete lemma schemas must satisfy the type model
- schema authoring does not get to define the public DTO shape retroactively

This spec should therefore be read as a response to practical integration pain,
not just as a theoretical redesign exercise.

## Core Decisions

### 1. Public surface is split hard by concern

v2 separates the public API into distinct modules:

- `dumling`: workflow API, builders, converters, IDs, descriptor helpers
- `dumling/types`: DTO types and type utilities only
- `dumling/schema`: runtime Zod schemas only

Schemas are not part of the primary workflow API.

### 2. `Universal` is first-class in ontology, types, and schema

`Universal` is the authored ontology superset.

Every concrete language DTO is a subset of the corresponding universal DTO.
Universal owns:

- all supported lemma kinds
- all supported lemma sub-kinds
- the full feature inventory
- the widest allowed feature-value space

Each concrete language narrows:

- which lemma sub-kinds are valid
- which features are allowed for a given sub-kind
- which feature values are allowed for a given feature

`Universal` is not a helper-only side namespace. It is a first-class public
concept in the ontology, public type layer, and schema layer:

- `Lemma<"Universal", ...>` is valid
- `schema.universal...` is valid

`Universal` does not need to participate everywhere the concrete runtime
languages do. In particular, the v2 spec does not require universal hydrated
`Selection` workflow APIs or universal string-instance workflows.

Universal selection may still exist at the type and schema levels for ontology
browsing and validation shape generation.

### 3. `Selection` is always hydrated

`Selection` always contains a `Surface`.

`Surface` always contains a `Lemma`.

The current mixed model where a selection can be either hydrated or unresolved
does not survive into v2.

### 4. `lemmaSubKind` is the public field name

v2 uses `lemmaSubKind` as the public DTO field across lemma families.

Internal or derived concepts such as `pos`, `morphemeKind`, and
`phrasemeKind` should not be the primary public discriminator shape.

### 5. `spellingRelation` is always explicit

`spellingRelation` is explicit public data. It is never implied by omission.

`orthographicStatus`, `selectionCoverage`, and `spellingRelation` are
independent properties of the observed selected string.

They can validly coexist in any compatible combination. For example, a
selection may be both `Typo` and `Variant`.

`selectionCoverage` is a coarse semantic label only.

It does not encode offsets, token spans, or alignment metadata. Positional
selection geometry is intentionally out of scope for the canonical DTO model.

### 6. Language-bound workflow API is primary

The primary usage style is:

```ts
const en = dumling.en;
```

The root runtime entrypoint is a curated language namespace object rather than a
language-selector function.

The canonical language-bound workflow namespaces are:

- `create`
- `convert`
- `extract`
- `parse`
- `describe`
- `id`

### 7. Language inventory is strictly curated

v2 does not expose a public extension mechanism for arbitrary consumer-defined
languages or schema packs.

The package owns a curated language inventory and a curated universal ontology.

### 8. Builders accept DTO-shaped input

The creation API accepts DTO-shaped input rather than a separate builder-only
payload dialect.

Builders exist to make canonical DTO construction easier and safer. They do not
define a second authoring model.

More precisely, builder inputs are DTO-shaped except for fields already implied
by the builder namespace being called.

### 9. Public failure paths use a plain result envelope

Public APIs that can fail should use a dependency-free result envelope:

```ts
type ApiResult<T, E> =
	| { success: true; data: T; error?: undefined }
	| { success: false; data?: undefined; error: E };
```

v2 should move away from `neverthrow`.

Error payloads should use explicit typed codes rather than freeform strings.

Only parse-like public APIs are intended to be fallible.

Non-fallible public helpers should consume and return canonical DTOs directly.

`create.*` is only for trusted typed construction.

`parse.*` is the only public boundary where runtime validation and
normalization happen.

### 10. Every lemma carries `inherentFeatures`

Every `Lemma` has an `inherentFeatures` object.

For lemma contexts where no inherent features are meaningful, that object is
simply empty.

### 11. `inflectionalFeatures` is surface-kind-dependent

`Surface.inflectionalFeatures` is present only for inflection surfaces.

Lemma-backed surfaces do not carry an always-empty `inflectionalFeatures`
object.

If an inflection surface exists, `inflectionalFeatures` is required and should
not be empty.

Some lemma sub-kinds may simply be non-inflectable and therefore admit no
inflection surfaces at all.

Concrete language packs are responsible for enforcing which lemma sub-kinds can
participate in inflection.

## Non-Goals

- compatibility-first preservation of v1 internal structure
- deep schema registry indexing as the main ergonomic path
- parallel public type families for `entities`, `operation`, and `id`
- exposing unresolved user input as a first-class hydrated Dumling entity

## Public Module Map

## `dumling`

Primary workflow and utility entrypoint.

Proposed exports:

- `dumling`
- descriptor helpers
- creation helpers
- conversion helpers
- extraction helpers
- parse helpers
- ID encode/decode helpers

Example:

```ts
import { dumling } from "dumling";

const en = dumling.en;
```

## `dumling/types`

Types only.

Proposed exports:

- `Language`
- `LemmaKind`
- `LemmaSubKind`
- `SurfaceKind`
- `Selection`
- `Surface`
- `Lemma`
- feature bag types
- descriptor helper types
- universal-to-language narrowing utilities

Example:

```ts
import type { Lemma, Selection } from "dumling/types";
```

## `dumling/schema`

Runtime schemas only.

Proposed exports:

- `schema`

Example:

```ts
import { schema } from "dumling/schema";

schema.en.lemma.lexeme.verb();
schema.universal.lemma.lexeme.verb();
```

## Primary Workflow API

## Root

```ts
import { dumling } from "dumling";

const en = dumling.en;
```

v2 answers the old request for a more coherent high-level workflow API through
six coordinated language-bound namespaces instead of a separate `annotate`
object:

- `create`
- `convert`
- `extract`
- `parse`
- `describe`
- `id`

## Language-bound API shape

```ts
const en = dumling.en;

en.create.lemma(...);
en.create.surface.lemma(...);
en.create.surface.inflection(...);
en.create.selection.standard(...);
en.create.selection.typo(...);

en.convert.lemma.toSurface(...);
en.convert.lemma.toSelection(...);
en.convert.surface.toSelection(...);

en.extract.lemma(...);

en.parse.lemma(...);
en.parse.surface(...);
en.parse.selection(...);

en.id.encode(...);
en.id.decode(...);
en.id.decodeAs(...);

en.describe.as.lemma(...);
en.describe.as.surface(...);
en.describe.as.selection(...);
```

## Canonical usage example

```ts
import { dumling } from "dumling";

const en = dumling.en;

const lemma = en.create.lemma({
	canonicalLemma: "give up",
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeatures: {
		phrasal: "Yes",
	},
	meaningInEmojis: "🏳️",
});

const surface = en.create.surface.inflection({
	lemma,
	normalizedFullSurface: "gave up",
	inflectionalFeatures: {
		tense: "Past",
		verbForm: "Fin",
	},
});

const selection = en.create.selection.typo({
	surface,
	spelledSelection: "gvae",
	selectionCoverage: "Partial",
	spellingRelation: "Canonical",
});

const id = en.id.encode(selection);
const decoded = en.id.decodeAs("Selection", id);
```

## Type Model

## Languages

v2 languages:

- `Universal`
- curated concrete languages such as `en`, `de`, and `he`

Proposed type:

```ts
type Language = "Universal" | "en" | "de" | "he";
```

### Language code policy

The public API should use UD language codes rather than full language names.

This includes:

- DTO `language`
- `dumling.<language>`
- public type parameters
- schema keys where applicable
- ID inspection metadata

Current curated examples:

- `en`
- `de`
- `he`

Any future curated language pack should follow the same rule and use its UD
language code as the public identifier.

`"Universal"` remains the one intentional exception to the UD-code rule.

## Canonical entity model

```ts
type SurfaceKind = "Lemma" | "Inflection";

type OrthographicStatus = "Standard" | "Typo";
type SelectionCoverage = "Full" | "Partial";
type SpellingRelation = "Canonical" | "Variant";

type UniversalLemma<
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = {
	language: "Universal";
	canonicalLemma: string;
	lemmaKind: LK;
	lemmaSubKind: LSK;
	inherentFeatures: UniversalInherentFeaturesFor<LK, LSK>;
	meaningInEmojis: string;
};

type Lemma<
	L extends Language = "Universal",
	LK extends LemmaKindFor<L> = LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = LemmaForLanguage<L, LK, LSK>;

type Surface<
	L extends Exclude<Language, "Universal"> = Exclude<Language, "Universal">,
	SK extends SurfaceKindFor<L> = SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK> = LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = {
	language: L;
	normalizedFullSurface: string;
	surfaceKind: SK;
	lemma: Lemma<L, LK, LSK>;
} & SurfacePayloadFor<L, SK, LK, LSK>;

type Selection<
	L extends Exclude<Language, "Universal"> = Exclude<Language, "Universal">,
	OS extends OrthographicStatus = OrthographicStatus,
	SK extends SurfaceKindFor<L> = SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK> = LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = {
	language: L;
	orthographicStatus: OS;
	selectionCoverage: SelectionCoverage;
	spelledSelection: string;
	spellingRelation: SpellingRelation;
	surface: Surface<L, SK, LK, LSK>;
};

type SurfacePayloadFor<
	L extends Language,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = SK extends "Lemma"
	? {}
	: SK extends "Inflection"
		? {
				inflectionalFeatures: InflectionalFeaturesFor<L, LK, LSK>;
			}
		: never;
```

The important structural point is that generic universal base shapes such as
`UniversalLemma<LK, LSK>` exist first, and concrete language DTOs are
subsettable restrictions over those base shapes.

The public generic wrappers like `Lemma<...>` and `Surface<...>` are then typed
views over those concrete DTO families rather than the canonical source of the
base shape themselves.

More specifically, public generic wrappers such as `Lemma<L, LK, LSK>` should
behave as views over concrete leaf DTO families.

Those concrete leaf DTO families are restrictions over generic universal bases
such as `UniversalLemma<LK, LSK>`.

The public generic layer must not become an independently reconstructed
parallel model.

`meaningInEmojis` is not decorative side metadata.

It is a core part of the public lemma model because it provides the compact
semantic anchor that lets downstream consumers distinguish otherwise similar or
identically spelled lemmas in real workflows.

This required field exists to carry meaning in a form that is cheap for humans and
machines to compare during lemma lookup, candidate narrowing, stub creation,
and follow-up enrichment flows.

`Surface` and `Selection` should be finalized with the same dependent-default
generic style used for `Lemma`, rather than with wider uncoupled defaults.

Concrete examples:

```ts
const lemmaSurface = {
	language: "en",
	normalizedFullSurface: "walk",
	surfaceKind: "Lemma",
	lemma: someLemma,
};

const inflectionSurface = {
	language: "en",
	normalizedFullSurface: "walks",
	surfaceKind: "Inflection",
	lemma: someLemma,
	inflectionalFeatures: {
		number: "Sing",
		person: "3",
	},
};
```

## Invariants

- `Selection` is always hydrated.
- `Surface` always owns a nested `Lemma`.
- `language` is preserved as a literal through creation and conversion helpers.
- repeated `language` fields in canonical hydrated DTOs must be equal.
- creation and conversion helpers derive repeated outer `language` fields from
  nested `lemma.language`.
- parse-style APIs reject nested `language` mismatches rather than rewriting
  outer layers.
- `lemmaKind` and `lemmaSubKind` preserve their relation in public types.
- `meaningInEmojis` is core public lemma data, not decorative metadata.
- impossible kind/sub-kind combinations are not representable.
- impossible language/sub-kind combinations are not representable.
- `orthographicStatus`, `selectionCoverage`, and `spellingRelation` are
  orthogonal properties of the observed selection string.
- `inflectionalFeatures` exists only where the surface kind actually supports
  inflection.
- if an inflection surface exists, `inflectionalFeatures` is required and
  non-empty.
- `Inflection` surfaces may only wrap lemma kinds that are explicitly allowed by
  the ontology.
- language packs may forbid inflection entirely for some lemma sub-kinds.

## Universal-First Ontology

## Authoring model

The rewrite should author the ontology once at the universal level.

Language packs should be restrictions over universal, not parallel hand-built
systems.

Conceptually:

```ts
type UniversalFeatures = {
	tense?: ...;
	verbForm?: ...;
	voice?: ...;
	case?: ...;
	gender?: ...;
	...
};

type FeatureBagFor<
	L extends Language,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = NarrowFeatureBag<
	UniversalFeatures,
	AllowedFeaturesFor<L, LK, LSK>,
	AllowedFeatureValuesFor<L, LK, LSK>
>;
```

`UniversalFeatures` is not split by lemma kind or lemma sub-kind. It is the
shared superset feature inventory for the entire ontology.

Public feature names should follow UD naming for UD features and UD-like naming
for custom features.

Lemma kind and lemma sub-kind only constrain:

- which features from `UniversalFeatures` are valid in context
- which values are valid for those features in context

At runtime, parse-style feature-bag normalization should strip feature keys that
are unknown to the ontology entirely.

Feature keys that are known to the ontology but not allowed for the current
language and leaf context should cause parse failure rather than being silently
erased.

## Meaning of "subset"

For each concrete language `L` and any compatible DTO family:

```ts
EnNounLexemeLemma extends UniversalLemma<"Lexeme", "NOUN">
EnRootMorphemeLemma extends UniversalLemma<"Morpheme", "Root">
...
```

This subset rule is defined over the concrete non-generic DTO families.

Public generic wrappers such as `Lemma<L, ...>` are the typed interface layered
over those concrete families.

The subset rule applies at both levels:

- field presence
- allowed field values

## Schema API

## Design goals

- schemas live in their own module
- schema browsing is static and discoverable
- schema access is not mixed into the `dumling.<language>` runtime namespace
- universal and concrete language schemas share one shape
- the primary public schema surface is a static tree, not a selector-first API

## Proposed shape

```ts
import { schema } from "dumling/schema";

schema.universal.lemma.lexeme.verb;
schema.universal.surface.inflection.lexeme.verb;
schema.universal.selection.typo.inflection.lexeme.verb;

schema.en.lemma.lexeme.verb;
schema.en.surface.inflection.lexeme.verb;
schema.en.selection.standard.inflection.lexeme.verb;

schema.de.lemma.lexeme.noun;
schema.he.lemma.lexeme.verb;
```

Preferred public shape:

```ts
schema.universal.lemma.lexeme.verb();
schema.universal.surface.inflection.lexeme.verb();
schema.universal.selection.typo.inflection.lexeme.verb();

schema.en.lemma.lexeme.verb();
schema.en.surface.inflection.lexeme.verb();
schema.en.selection.standard.inflection.lexeme.verb();
```

The public schema API should stay tree-shaped and statically browsable, with
zero-argument leaf functions returning the canonical schema for that leaf.

Callable selector helpers are not the primary v2 schema surface.

## Naming rule

The schema registry uses compact lowercase keys:

- `universal`
- `en`
- `de`
- `he`

This is intentionally separate from DTO `language` values like `"en"` and
`"Universal"`.

These schema keys are locked as the intended v2 public shape.

## Authored vs derived schemas

The rewrite should minimize authored schema fan-out.

Authored:

- universal ontology
- language restrictions
- lemma schema definitions
- valid surface variant definitions

Derived:

- surface schemas
- hydrated selection schemas
- type unions
- builder input types
- ID decode target unions

## Types API

The `dumling/types` entrypoint should expose public types without dragging in
runtime builders or schema registries.

Important type helpers:

```ts
type LemmaKindFor<L extends Language> = ...;
type LemmaSubKindFor<
	L extends Language,
	LK extends LemmaKindFor<L>,
> = ...;

type LemmaDescriptor<
	L extends Language,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	language: L;
	lemmaKind: LK;
	lemmaSubKind: LSK;
};

type SurfaceDescriptor<
	L extends Language,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	language: L;
	surfaceKind: SK;
	lemmaKind: LK;
	lemmaSubKind: LSK;
};

type SelectionDescriptor<
	L extends Language,
	OS extends OrthographicStatus,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	language: L;
	orthographicStatus: OS;
	surfaceKind: SK;
	lemmaKind: LK;
	lemmaSubKind: LSK;
};

type FeatureName = keyof UniversalFeatures;

type UniversalFeatureValue<
	F extends FeatureName,
> = UniversalFeatures[F];

type FeatureNameFor<
	L extends Language,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = ...;

type FeatureValueFor<
	L extends Language,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
	F extends FeatureNameFor<L, LK, LSK>,
> = ...;

type FeatureBagFor<
	L extends Language,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = ...;

type InherentFeaturesFor<
	L extends Language,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = ...;

type InflectionalFeaturesFor<
	L extends Language,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = ...;
```

The important requirement is that public helper types preserve the relation
between `lemmaKind` and `lemmaSubKind` rather than collapsing back to a weak
cross-product.

Descriptor helpers summarize schema coordinates rather than instance identity.

Proposed API:

```ts
en.describe.as.lemma(lemmaOrSurfaceOrSelection);
en.describe.as.surface(lemmaOrSurfaceOrSelection);
en.describe.as.selection(lemmaOrSurfaceOrSelection);
```

Descriptor promotion follows schema-coordinate defaults only:

- `lemma -> surface` uses `surfaceKind: "Lemma"`
- `lemma -> selection` uses
  `surfaceKind: "Lemma"` and `orthographicStatus: "Standard"`
- `surface -> selection` uses `orthographicStatus: "Standard"`

Examples:

```ts
en.describe.as.lemma(lemma);
// { language: "en", lemmaKind: "Lexeme", lemmaSubKind: "NOUN" }

en.describe.as.surface(lemma);
// {
//   language: "en",
//   surfaceKind: "Lemma",
//   lemmaKind: "Lexeme",
//   lemmaSubKind: "NOUN",
// }

en.describe.as.selection(lemma);
// {
//   language: "en",
//   orthographicStatus: "Standard",
//   surfaceKind: "Lemma",
//   lemmaKind: "Lexeme",
//   lemmaSubKind: "NOUN",
// }

en.describe.as.selection(surface);
// {
//   language: "en",
//   orthographicStatus: "Standard",
//   surfaceKind: "Inflection",
//   lemmaKind: "Lexeme",
//   lemmaSubKind: "NOUN",
// }
```

For consumers, these helpers should support both universal and contextual
lookups.

Examples:

```ts
type Gender = UniversalFeatureValue<"gender">;

type DeNounGender = FeatureValueFor<
	"de",
	"Lexeme",
	"NOUN",
	"gender"
>;
```

v2 should not introduce a generic `Feature<...>` alias. That name is too
ambiguous about whether it means a feature key, a feature value, a feature
field, or a whole feature bag.

Using Zod enums as the source of truth for enumerable atoms such as languages,
kinds, sub-kinds, features, and feature values is acceptable.

That does not change the main v2 direction: Zod object schemas are not the
source of truth for concrete language DTO families, feature-set restrictions,
or hydrated public entity shapes.

### Lemma sub-kind casing policy

The current direction is to use UD-style capitalized public values for lemma
sub-kinds where that concept maps to POS-like categories, for example:

- `"NOUN"`
- `"VERB"`
- `"ADJ"`

This rule should be applied consistently anywhere public lemma sub-kinds are
exposed.

## Generic API signature guideline

When public functions need to preserve language and discriminator precision,
they should usually quantify the relevant generics explicitly instead of
accepting a wide bare `Lemma` alias.

Preferred pattern:

```ts
function foo<
	L extends Language,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
>(lemma: Lemma<L, LK, LSK>) {
	...
}
```

This keeps inference tied to the input value and avoids accidental widening
through defaulted type parameters.

## Creation API

Builders are part of the primary workflow API.

They do not hide DTO structure. They make DTO construction less repetitive and
preserve literal precision.

`create.*` is for already-known, already-shaped, trusted typed input.

It is not the runtime boundary for unknown external payloads.

That boundary belongs to `parse.*`.

Proposed surface:

```ts
en.create.lemma(input);
en.create.surface.lemma(input);
en.create.surface.inflection(input);
en.create.selection.standard(input);
en.create.selection.typo(input);
```

Builder behavior:

- returns plain DTO objects
- preserves literal language and discriminator types
- applies canonical defaults only where the defaults are part of the model
- does not invent hidden state
- accepts DTO-shaped input, except for namespace-implied fields, rather than a
  separate builder-only payload shape
- if callers force namespace-implied fields in anyway, `create.*` ignores those
  inputs and derives the canonical values from the namespace being called
- is not part of the fallible parse-style API surface
- does not perform parse-style runtime validation or normalization
- if callers bypass typing in plain JS or via `as any`, invalid DTO construction
  is possible; runtime enforcement belongs to `parse.*`

## Parse API

`parse.*` is the runtime boundary for unknown, external, or otherwise untrusted
input.

This is where public validation and normalization happen.

Conceptually:

```ts
en.parse.lemma(input);
en.parse.surface(input);
en.parse.selection(input);
```

Parse-style APIs are fallible and return the shared `ApiResult<T, E>`
envelope.

They are responsible for:

- validating runtime shape and discriminator compatibility
- validating hydrated nested consistency
- rejecting known-but-context-illegal feature keys
- applying the documented normalization behavior
- stripping feature keys that are unknown to the ontology

The intended normalization scope is deliberately narrow:

- Unicode normalization
- lowercasing where the relevant field is modeled as normalized text

In the canonical DTO model, that lowercasing rule applies to:

- `canonicalLemma`
- `normalizedFullSurface`

It does not apply to `spelledSelection`, which remains the observed selected
string rather than a normalized text field.

Parse-style normalization does not imply trimming, whitespace collapsing, span
inference, or arbitrary canonicalization beyond those rules.

If unknown feature stripping leaves `inflectionalFeatures` empty for an
inflection surface, parse must fail.

## Conversion and Extraction API

Conversions remain useful, but should be simpler than v1.

Proposed surface:

```ts
en.convert.lemma.toSurface(lemma);
en.convert.lemma.toSelection(lemma, options);
en.convert.surface.toSelection(surface, options);

en.extract.lemma(lemmaOrSurfaceOrSelection);
```

This preserves the useful happy path from v1 without centering the whole public
interface around conversions.

`extract` exists as an ergonomic projection helper for callers working with
arbitrary entity unions.

In particular, `extract.lemma(lemma | surface | selection)` is a convenient way
to normalize unknown entity-level input back to a lemma without forcing the
consumer to branch on the input shape first.

For callers that already know the exact DTO shape, direct property access is
still sufficient:

```ts
lemma;
surface.lemma;
selection.surface.lemma;
```

Defaulting is part of the intended conversion contract:

- `toSurface(lemma)` defaults to a lemma surface
- `toSelection(lemma)` defaults to a standard full canonical lemma selection
  whose `spelledSelection` is taken from the input lemma spelling
- `toSelection(surface)` defaults to a standard full canonical selection over
  that surface, whose `spelledSelection` is taken from the input surface
  spelling

`toSelection(..., options)` may override any selection-level field:

- `spelledSelection`
- `orthographicStatus`
- `selectionCoverage`
- `spellingRelation`

## ID API

IDs remain part of the primary workflow API, but should consume the canonical
DTO types instead of a codec-specific parallel public model.

v2 does not guarantee cross-release stability of the internal ID encoding.

The package reserves the right to change the internal ID representation across
releases.

What should remain stable is the semantic purpose of the ID layer: preserving
the distinctions that matter between different lemmas and hydrated entities,
including same-spelling collisions such as `der See` versus `die See` or
`коса` versus `коса`.

Proposed surface:

```ts
en.id.encode(value);
en.id.decode(id);
en.id.decodeAs("Lemma", id);
en.id.decodeAs("Surface", id);
en.id.decodeAs("Selection", id);
```

These method names are the intended v2 API:

- `encode`
- `decode`
- `decodeAs`

`decodeAs(...)` returns the requested canonical DTO family when successful.

Bare `decode(...)` returns a tagged result so callers can discriminate the
decoded entity kind without relying on structural guessing.

That `entityKind` tag is part of the actual runtime success payload returned by
`decode(...)`, not just a conceptual description.

Decode helpers and other fallible public APIs should return the shared
`ApiResult<T, E>` envelope rather than throwing or depending on `neverthrow`.

ID decode failures should use the same result envelope and a typed error DTO
whose `code` is constrained by a Zod enum of allowed ID error codes.

Conceptually:

```ts
const DumlingIdErrorCodeSchema = z.enum([
	"MalformedId",
	"UnsupportedVersion",
	"UnsupportedLanguage",
	"UnsupportedEntityKind",
	"LanguageMismatch",
	"EntityMismatch",
	"PayloadDecodeFailed",
]);

type DumlingIdErrorCode =
	| "MalformedId"
	| "UnsupportedVersion"
	| "UnsupportedLanguage"
	| "UnsupportedEntityKind"
	| "LanguageMismatch"
	| "EntityMismatch"
	| "PayloadDecodeFailed";
type DumlingIdError = {
	code: DumlingIdErrorCode;
	message: string;
	input: string;
};
```

Then decode-style APIs return:

```ts
ApiResult<DecodedValue, DumlingIdError>
```

Conceptually, bare decode uses a tagged payload:

```ts
type DecodedValue =
	| { entityKind: "Lemma"; data: Lemma<any, any, any> }
	| { entityKind: "Surface"; data: Surface<any, any, any, any> }
	| { entityKind: "Selection"; data: Selection<any, any, any, any, any> };
```

## Selection And Invalid Input

`ObservedSelection` is removed from the v2 public model.

That implies:

- `Selection` means hydrated selection only
- unresolved or invalid user input is owned by the consumer
- `dumling` models valid linguistic annotations, not arbitrary pre-resolution
  input states
- gibberish or otherwise unresolved raw text is out of scope for the canonical
  DTO model

## Migration Consequences

v2 is allowed to break v1 public structure.

When the rewrite lands, the old v1 public surface is expected to be removed
rather than maintained in parallel.

There is no intended long-term state where `dumling` ships both a backward-
compatible v1 surface and a new v2 surface side by side.

After the rewrite, the new interface becomes the package interface.

Expected breaks:

- root `schema` access moves to `dumling/schema`
- public type imports move to `dumling/types`
- `lemmaSubKind` replaces family-specific discriminator field names in the
  primary DTO surface
- `Selection` no longer includes unresolved states
- public APIs stop mirroring internal registry layering
- public failure paths move to `{ success, data, error }`

## Bottom Line

The v2 interface should be built around one canonical ontology and one
canonical DTO family.

`Universal` is the superset.
Concrete languages are restrictions of it.
Schemas, types, and workflow helpers are separate public surfaces.
`Selection` is always hydrated.
`lemmaSubKind` is the public discriminator field.

That is the target the new internals should be built to satisfy.

The project is still early enough that a full rewrite is cheaper than dragging
the current internals forward behind a compatibility story they have not earned
yet.

The rewrite is justified by actual usage: trying to use `dumling` as a real
library exposed enough friction and awkwardness that a ground-up reset is the
cleaner path.

v1 also reflects the reality that the project did not arrive at the right
shapes immediately. Some of the current structure is the residue of getting
there the hard way.

This rewrite is allowed to acknowledge that history directly:

- schema-derived public typing was a failed experiment
- some v1 shapes exist because the model was discovered gradually
- v2 should keep the linguistic ideas and discard the architectural baggage

There should therefore be one `dumling`, not a permanently split v1/v2 product
line. Once the rewrite is implemented, the rewritten interface is the only
interface.
