# New Schemas Public API Implementation Plan

## Purpose

This document defines the implementation plan for the greenfield public
`new-schemas` interface.

The target public surface is intentionally small:

```ts
const schema = schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();

const dynamicSchema =
	getSchemaTreeFor(lang).entity.Selection.Standard.Lemma.Lexeme.NOUN();
```

The API should make fixed-language access ergonomic while still supporting
dynamic language selection. Leaf calls return actual Zod schema objects.

`abstract` schemas are out of scope for this implementation plan. They remain a
separate public design task. This plan intentionally covers only concrete
supported languages such as `de`, `en`, and `he`.

## Target Interface

The public `dumling/schema` entrypoint should expose:

```ts
export const schemas: {
	[L in SupportedLanguage]: NewLanguageSchemaTree<L>;
};

export function getSchemaTreeFor<const L extends SupportedLanguage>(
	language: L,
): NewSchemaRegistry[L];
```

`schemas` is the canonical registry. `getSchemaTreeFor` is a typed dynamic
accessor over that registry.

The public type language should be `SupportedLanguage` from `dumling/types`.
Do not expose internal `ConcreteLanguage` unless a future API needs a semantic
distinction between "supported by the package" and "implemented by concrete
feature registries".

Do not expose per-language top-level exports such as `deSchema`, `enSchema`,
or `heSchema` in the first version of this API.

This is a breaking replacement for the old `dumling/schema` surface. The old
shape exposed `schema.abstract...` and `schema.de.selection.standard...`; the
new concrete-language shape exposes named exports and descriptor-cased paths:

```ts
schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
```

Abstract schema support is not removed by implication; it is deferred to a
separate design and implementation plan.

No cross-compatibility layer is required for this greenfield plan.

## Public Tree Shape

Each language schema tree should use this top-level shape:

```ts
const lemmaSchema = schemas.de.entity.Lemma.Lexeme.NOUN();
const surfaceSchema = schemas.de.entity.Surface.Lemma.Lexeme.NOUN();
const selectionSchema =
	schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
```

The `entity` namespace is reserved for hydrated entity schemas.

Paths under `entity` mirror descriptor axes. API/container namespaces remain
lowercase, while descriptor-axis values keep their public casing:

```ts
schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
//                 ^         ^        ^     ^      ^
//                 entity    status   surface lemma  sub-kind
```

This leaves room for sibling schema families later, for example:

```ts
const descriptorSchema =
	schemas.de.descriptor.Selection.Standard.Lemma.Lexeme.NOUN();
```

Descriptor schemas may exist internally during implementation, but they should
not be added to the public surface unless the descriptor API is deliberately
designed and accepted.

## Design Rules

- `schemas` is a registry, not a builder.
- `getSchemaTreeFor(language)` must return the exact same tree object as
  `schemas[language]`.
- Schema leaves are callable getter functions returning Zod schemas.
- Consumers pass the result of a leaf call, not the leaf function itself, when
  they need an actual schema object.
- Repeated dynamic access must not rebuild the language tree.
- Literal language arguments should preserve narrow return types.
- Union language arguments may return a union language tree.
- The public API should not expose the old `runtimeSchemas` concept.
- Broad parse unions, if still needed, are private derived implementation
  details. They must not be exported from `dumling/schema`.

## Implementation Steps

### 1. Define Public Helper Types

Create or update `src/new-schemas/shared/schema-helper-types.ts` so it can
describe one language tree and the full registry clearly.

Expected type concepts:

```ts
export type NewSchemaGetter<T> = () => z.ZodType<T>;

export type NewLanguageEntitySchemaTree<L extends SupportedLanguage> = {
	Lemma: ...;
	Surface: ...;
	Selection: ...;
};

export type NewLanguageSchemaTree<L extends SupportedLanguage> = {
	entity: NewLanguageEntitySchemaTree<L>;
};

export type NewSchemaRegistry = {
	[L in SupportedLanguage]: NewLanguageSchemaTree<L>;
};

type EverySupportedLanguageHasConcreteSchema =
	SupportedLanguage extends keyof NewSchemaRegistry ? true : never;
```

Prefer names that describe the public contract. Avoid carrying forward names
that only make sense in the old `src/schemas` implementation.

Add a type-level guard that fails if `SupportedLanguage` and the implemented
schema registry drift apart. They are equivalent today, but the public API
should not silently accept a supported language without a concrete schema tree.

### 2. Adapt Existing Language Subtrees

The current `new-schemas` language subtrees already represent entity schemas.
They do not yet match the target public API directly.

Current internal subtrees use lowercase entity-kind keys and raw Zod leaves:

```ts
deSubtree.selection.Standard.Lemma.Lexeme.NOUN
```

The public API requires descriptor-cased entity-kind keys and callable leaf
getters:

```ts
schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN()
```

Implementation therefore needs an adapter. Do not reshape
`buildLanguageSchema` in the first public API PR unless there is a specific
blocker. Existing descriptor construction consumes the lowercase raw tree, so
an adapter is the lower-risk boundary.

An adapter approach should look conceptually like this:

```ts
const deEntitySchemas = adaptEntitySchemaTree(deSubtree);

const deSchema = {
	entity: deEntitySchemas,
} satisfies NewLanguageSchemaTree<"de">;
```

The adapter must:

- map `lemma` to `Lemma`, `surface` to `Surface`, and `selection` to
  `Selection`
- preserve descriptor-axis keys such as `Standard`, `Lemma`, `Lexeme`, and
  `NOUN`
- wrap raw Zod leaves as `NewSchemaGetter<T>`
- keep language tree object identity stable
- return the same schema object from repeated calls when wrapping an existing
  raw Zod leaf
- avoid rebuilding schema objects in the adapter unless rebuilding is
  deliberately chosen and tested

### 3. Export The Registry

Update `src/new-schemas/public-schemas.ts` to export the canonical registry:

```ts
export const schemas: NewSchemaRegistry = {
	de: {
		entity: adaptEntitySchemaTree(deSubtree),
	},
	en: {
		entity: adaptEntitySchemaTree(enSubtree),
	},
	he: {
		entity: adaptEntitySchemaTree(heSubtree),
	},
};
```

Prefer an explicit `NewSchemaRegistry` export annotation unless the intentionally
narrow inferred object type is needed for better autocomplete. If the
implementation uses `satisfies NewSchemaRegistry` instead, inspect
`dist/schema.d.ts` and confirm the emitted declaration is not excessively noisy
or coupled to internal tree details.

If descriptor schema construction still needs the raw entity subtree map, keep
that as an internal constant:

```ts
const entitySchemasByLanguage = {
	de: deSubtree,
	en: enSubtree,
	he: heSubtree,
} satisfies NewEntitySchemaRegistry;
```

### 4. Keep Descriptor Schemas Private For Now

Current `new-schemas/public-schemas.ts` exports descriptor schema artifacts.
The first public version of this API should not expose descriptor schemas.

Descriptor schema construction may remain internal if other implementation code
needs it, but `dumling/schema` should not export:

```ts
descriptorSchema
descriptorSchemas
newSchema
```

until descriptor use cases have their own accepted public design.

### 5. Add Dynamic Access

Add `getSchemaTreeFor` as a thin accessor:

```ts
export function getSchemaTreeFor<const L extends SupportedLanguage>(
	language: L,
): NewSchemaRegistry[L] {
	return schemas[language];
}
```

`NewSchemaRegistry[L]` or `(typeof schemas)[L]` is preferred over
`NewLanguageSchemaTree<L>` because it reflects an indexed lookup into real
registry entries. This matters more for union language values.

This function should not perform validation by itself. It is typed for known
`SupportedLanguage` values. Consumers with untrusted strings should narrow them
before calling it.

### 6. Decide The Published Entrypoint

Make `dumling/schema` export the new API:

```ts
export {
	getSchemaTreeFor,
	schemas,
} from "./new-schemas/public-schemas";
```

If the old schema entrypoint still exists during the transition, do not mix old
and new shapes in one exported object. Keep any temporary compatibility layer
explicitly separate and remove it before treating this as the greenfield public
surface.

This is a hard public API break from:

```ts
import { schema } from "dumling/schema";

schema.de.selection.standard.lemma.lexeme.noun();
```

to:

```ts
import { getSchemaTreeFor, schemas } from "dumling/schema";

schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
getSchemaTreeFor(language).entity.Selection.Standard.Lemma.Lexeme.NOUN();
```

Tests and generated docs should be updated accordingly.

### 7. Remove The Public Runtime-Schema Concept

Do not reintroduce this public shape:

```ts
runtimeSchemas.de.selection
```

Consumers should not need to know that the old implementation had a separate
`runtimeSchemas` layer. The public schema API should expose addressable schema
getters only:

```ts
schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
getSchemaTreeFor(language).entity.Selection.Standard.Lemma.Lexeme.NOUN();
```

After the full move to `new-schemas`, internal operations should use this same
schema tree shape wherever possible. The package should not maintain one schema
API for consumers and another parallel runtime-schema registry for itself.

For descriptor-specific operations, internal code should select the same leaf a
consumer would select:

```ts
const schema = getSchemaTreeFor(language)
	.entity.Selection[orthographicStatus][surfaceKind][lemmaKind][lemmaSubKind]();
```

If an operation truly needs to parse a broad union such as "any German
selection", build that union as a derived implementation detail from the public
schema tree. Keep the derivation private, and prefer memoizing it near the
operation that needs it:

```ts
const deSelectionUnionSchema = buildUnionFromSchemaSubtree(
	schemas.de.entity.Selection,
);
```

That derived union is an optimization/detail, not a public concept and not a
second source of truth.

Scope this carefully during implementation. If parse operations still depend on
old broad runtime unions, keep those internal unions temporarily for the PR that
introduces the public schema API. Removing or replacing internal parse unions is
a follow-up parse refactor unless the implementation task explicitly includes
it.

### 8. Update Documentation And Examples

Update README generation examples and package docs to use:

```ts
import { getSchemaTreeFor, schemas } from "dumling/schema";

const responseSchema = schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();

responseSchema.parse(value);

const dynamicResponseSchema =
	getSchemaTreeFor(language).entity.Selection.Standard.Lemma.Lexeme.NOUN();
```

Avoid documenting per-language named exports. Also avoid examples that pass a
leaf getter itself where a schema is expected:

```ts
// Do not document this as schema-passing usage.
schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN;
```

### 9. Add Package Entrypoint Tests

Add or update package entrypoint tests to prove:

```ts
import { getSchemaTreeFor, schemas } from "dumling/schema";

const staticSchema = schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
const dynamicSchema = getSchemaTreeFor("de").entity.Selection.Standard.Lemma.Lexeme.NOUN();

staticSchema.parse(value);
dynamicSchema.parse(value);

if (schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN() !== staticSchema) {
	throw new Error("leaf getter should return the stable schema object");
}

if (getSchemaTreeFor("de") !== schemas.de) {
	throw new Error("dynamic schema accessor must return registry object");
}
```

Also assert that the old and intentionally omitted exports are absent from the
package entrypoint:

```ts
const schemaModule = await import("dumling/schema");

if ("schema" in schemaModule) throw new Error("old schema export leaked");
if ("runtimeSchemas" in schemaModule) throw new Error("runtime schemas leaked");
```

Add a package hygiene assertion for declaration output. The test should inspect
`dist/schema.d.ts` after build and fail if the schema entrypoint leaks old
schema internals or emits an unexpectedly large declaration:

```ts
const schemaDts = readFileSync(resolve(projectRoot, "dist/schema.d.ts"), "utf8");

expect(schemaDts).not.toContain("runtimeSchemas");
expect(schemaDts).not.toContain("descriptorSchemas");
expect(schemaDts).not.toContain("src/schemas");
expect(schemaDts.length).toBeLessThan(SCHEMA_DTS_SIZE_LIMIT);
```

Choose `SCHEMA_DTS_SIZE_LIMIT` after seeing the intended emitted shape. The
point is to make declaration-size and internal-leakage review repeatable rather
than manual.

Type tests should verify:

```ts
const deTree = getSchemaTreeFor("de");
deTree satisfies NewLanguageSchemaTree<"de">;

declare const language: SupportedLanguage;
const languageTree = getSchemaTreeFor(language);
languageTree satisfies NewSchemaRegistry[SupportedLanguage];

getSchemaTreeFor(language).entity.Selection.Standard.Lemma.Lexeme.NOUN();
```

The final line is important. It proves the documented dynamic access path
actually compiles when callers have a `SupportedLanguage` union rather than a
single literal language.

If future supported languages diverge so much that `NOUN` is not common to all
language trees, revisit the dynamic API or require narrowing before accessing
language-specific leaves.

### 10. Check Build Output

Run the normal verification path after implementation:

```sh
bun run check
bun test
bun run test:package
```

Also inspect the generated `dist/schema.d.ts` while setting the initial package
hygiene threshold. Check whether the exported `schemas` declaration is
intentionally annotated as `NewSchemaRegistry` or intentionally emits a narrower
inferred object type.

## Acceptance Criteria

- `schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN()` works at runtime.
- `getSchemaTreeFor("de").entity.Selection.Standard.Lemma.Lexeme.NOUN()` works
  at runtime.
- `getSchemaTreeFor("de") === schemas.de`.
- Repeated calls to the same leaf getter return the same schema object when the
  getter wraps an existing raw Zod leaf.
- Literal language calls preserve language-specific types.
- `getSchemaTreeFor(language).entity.Selection.Standard.Lemma.Lexeme.NOUN()`
  compiles when `language` is typed as `SupportedLanguage`.
- A type-level guard fails if a `SupportedLanguage` lacks a concrete schema
  registry entry.
- `dumling/schema` does not export the old `schema` name.
- `dumling/schema` does not export `runtimeSchemas`.
- `dumling/schema` does not export `deSchema`, `enSchema`, or `heSchema`.
- `dumling/schema` does not export descriptor schema artifacts such as
  `descriptorSchema`, `descriptorSchemas`, or `newSchema`.
- The public tree uses descriptor-cased entity keys: `Lemma`, `Surface`, and
  `Selection`, not lowercase `lemma`, `surface`, and `selection`.
- Package entrypoint tests cover both static registry and dynamic accessor
  usage.
- Package hygiene tests check `dist/schema.d.ts` for old-schema leakage and
  declaration-size regressions.
- Documentation only presents the two accepted access patterns.
- Documentation states that leaf calls return Zod schemas for use in validators,
  LLM response-schema callers, and other schema-consuming APIs.

## Deferred Questions

- Should descriptor schemas be public later? Keep them internal until their
  consumer use cases are clearer.
- Should internal parse operations eventually replace broad runtime unions with
  derived unions or descriptor-selected leaf schemas from the public tree?

The current recommendation is to keep language trees stable and to memoize leaf
schemas where construction cost or identity matters. The public API should not
require consumers to care either way. The public contract is only that calling a
leaf getter returns a usable Zod schema object.
