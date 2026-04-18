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

## Core Decisions

### 1. Public surface is split hard by concern

v2 separates the public API into distinct modules:

- `dumling`: workflow API, builders, converters, IDs, descriptor helpers
- `dumling/types`: DTO types and type utilities only
- `dumling/schema`: runtime Zod schemas only

Schemas are not part of the primary workflow API.

### 2. `Universal` is first-class

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

`Universal` is not a helper-only side namespace. It participates in the same
model as real languages:

- `forLanguage("Universal")` is valid
- `Lemma<"Universal", ...>` is valid
- `Surface<"Universal", ...>` is valid
- `Selection<"Universal", ...>` is valid
- `schema.universal...` is valid

If any API is later restricted for `Universal`, that restriction must be
explicit and justified at the API level.

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

### 6. Language-bound workflow API is primary

The primary usage style is:

```ts
const en = forLanguage("en");
```

Language-specific singleton namespaces are not the preferred design center.

The canonical language-bound workflow namespaces are:

- `create`
- `convert`
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

### 9. Public failure paths use a plain result envelope

Public APIs that can fail should use a dependency-free result envelope:

```ts
type ApiResult<T, E> =
	| { success: true; data: T; error?: undefined }
	| { success: false; data?: undefined; error: E };
```

v2 should move away from `neverthrow`.

Error payloads should use explicit typed codes rather than freeform strings.

### 10. Every lemma carries `inherentFeatures`

Every `Lemma` has an `inherentFeatures` object.

For lemma contexts where no inherent features are meaningful, that object is
simply empty.

### 11. `inflectionalFeatures` is surface-kind-dependent

`Surface.inflectionalFeatures` is present only for inflection surfaces.

Lemma-backed surfaces do not carry an always-empty `inflectionalFeatures`
object.

## Non-Goals

- compatibility-first preservation of v1 internal structure
- deep schema registry indexing as the main ergonomic path
- parallel public type families for `entities`, `operation`, and `id`
- exposing unresolved user input as a first-class hydrated Dumling entity

## Public Module Map

## `dumling`

Primary workflow and utility entrypoint.

Proposed exports:

- `forLanguage`
- descriptor helpers
- creation helpers
- conversion helpers
- ID encode/decode helpers

Example:

```ts
import { forLanguage } from "dumling";

const en = forLanguage("en");
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
import { forLanguage } from "dumling";

const en = forLanguage("en");
const universal = forLanguage("Universal");
```

v2 answers the old request for a more coherent high-level workflow API through
four coordinated language-bound namespaces instead of a separate `annotate`
object:

- `create`
- `convert`
- `describe`
- `id`

## Language-bound API shape

```ts
const en = forLanguage("en");

en.create.lemma(...);
en.create.surface.lemma(...);
en.create.surface.inflection(...);
en.create.selection.standard(...);
en.create.selection.typo(...);

en.convert.lemma.toSurface(...);
en.convert.lemma.toSelection(...);
en.convert.surface.toSelection(...);

en.extract.lemma(...);
en.extract.surface(...);

en.id.encode(...);
en.id.decode(...);
en.id.decodeAs(...);

en.describe.as.lemma(...);
en.describe.as.surface(...);
en.describe.as.selection(...);
```

## Canonical usage example

```ts
import { forLanguage } from "dumling";

const en = forLanguage("en");

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
- `forLanguage(...)`
- public type parameters
- schema keys where applicable
- ID inspection metadata

Current curated examples:

- `en`
- `de`
- `he`

Any future curated language pack should follow the same rule and use its UD
language code as the public identifier.

## Canonical entity model

```ts
type SurfaceKind = "Lemma" | "Inflection";

type OrthographicStatus = "Standard" | "Typo";
type SelectionCoverage = "Full" | "Partial";
type SpellingRelation = "Canonical" | "Variant";

type Lemma<
	L extends Language = "Universal",
	LK extends LemmaKindFor<L> = LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = {
	language: L;
	canonicalLemma: string;
	lemmaKind: LK;
	lemmaSubKind: LSK;
	inherentFeatures: InherentFeaturesFor<L, LK, LSK>;
	meaningInEmojis?: string;
} & LemmaPayloadFor<L, LK, LSK>;

type Surface<
	L extends Language = "Universal",
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
	L extends Language = "Universal",
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
- `lemmaKind` and `lemmaSubKind` preserve their relation in public types.
- impossible kind/sub-kind combinations are not representable.
- impossible language/sub-kind combinations are not representable.
- `inflectionalFeatures` exists only where the surface kind actually supports
  inflection.
- `Inflection` surfaces may only wrap lemma kinds that are explicitly allowed by
  the ontology.

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

Lemma kind and lemma sub-kind only constrain:

- which features from `UniversalFeatures` are valid in context
- which values are valid for those features in context

## Meaning of "subset"

For each concrete language `L` and any compatible DTO family:

```ts
Lemma<L, ...> extends Lemma<"Universal", ...>
Surface<L, ...> extends Surface<"Universal", ...>
Selection<L, ...> extends Selection<"Universal", ...>
```

The subset rule applies at both levels:

- field presence
- allowed field values

## Schema API

## Design goals

- schemas live in their own module
- schema browsing is static and discoverable
- schema access is not mixed into `forLanguage(...)`
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

This is intentionally separate from DTO `language` values like `"English"` and
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

Descriptor promotion follows the canonical defaults already used elsewhere in
the model:

- `lemma -> surface` uses `surfaceKind: "Lemma"`
- `lemma -> selection` uses
  `surfaceKind: "Lemma"` and `orthographicStatus: "Standard"`
- `surface -> selection` uses `orthographicStatus: "Standard"`

Examples:

```ts
en.describe.as.lemma(lemma);
// { language: "de", lemmaKind: "Lexeme", lemmaSubKind: "NOUN" }

en.describe.as.surface(lemma);
// {
//   language: "de",
//   surfaceKind: "Lemma",
//   lemmaKind: "Lexeme",
//   lemmaSubKind: "NOUN",
// }

en.describe.as.selection(lemma);
// {
//   language: "de",
//   orthographicStatus: "Standard",
//   surfaceKind: "Lemma",
//   lemmaKind: "Lexeme",
//   lemmaSubKind: "NOUN",
// }

en.describe.as.selection(surface);
// {
//   language: "de",
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
type Gender = UniversalFeatureValue<"Gender">;

type DeNounGender = FeatureValueFor<
	"de",
	"Lexeme",
	"NOUN",
	"Gender"
>;
```

v2 should not introduce a generic `Feature<...>` alias. That name is too
ambiguous about whether it means a feature key, a feature value, a feature
field, or a whole feature bag.

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
- accepts DTO-shaped input rather than a separate builder-only payload shape

## Conversion and Extraction API

Conversions remain useful, but should be simpler than v1.

Proposed surface:

```ts
en.convert.lemma.toSurface(lemma);
en.convert.lemma.toSelection(lemma, options);
en.convert.surface.toSelection(surface, options);

en.extract.lemma(surface);
en.extract.surface(selection);
```

This preserves the useful happy path from v1 without centering the whole public
interface around conversions.

## ID API

IDs remain part of the primary workflow API, but should consume the canonical
DTO types instead of a codec-specific parallel public model.

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

type DumlingIdErrorCode = z.infer<typeof DumlingIdErrorCodeSchema>;

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
