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

## Target Interface

The public `dumling/schema` entrypoint should expose:

```ts
export const schemas: {
	[L in ConcreteLanguage]: NewLanguageSchemaTree<L>;
};

export function getSchemaTreeFor<const L extends ConcreteLanguage>(
	language: L,
): NewLanguageSchemaTree<L>;
```

`schemas` is the canonical registry. `getSchemaTreeFor` is a typed dynamic
accessor over that registry.

Do not expose per-language top-level exports such as `deSchema`, `enSchema`,
or `heSchema` in the first version of this API.

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
- Broad parse unions should live near parse or language-pack internals, not in
  `dumling/schema`.

## Implementation Steps

### 1. Define Public Helper Types

Create or update `src/new-schemas/shared/schema-helper-types.ts` so it can
describe one language tree and the full registry clearly.

Expected type concepts:

```ts
export type NewSchemaGetter<T> = () => z.ZodType<T>;

export type NewLanguageEntitySchemaTree<L extends ConcreteLanguage> = {
	Lemma: ...;
	Surface: ...;
	Selection: ...;
};

export type NewLanguageSchemaTree<L extends ConcreteLanguage> = {
	entity: NewLanguageEntitySchemaTree<L>;
};

export type NewSchemaRegistry = {
	[L in ConcreteLanguage]: NewLanguageSchemaTree<L>;
};
```

Prefer names that describe the public contract. Avoid carrying forward names
that only make sense in the old `src/schemas` implementation.

### 2. Wrap Existing Language Subtrees Under `entity`

The current `new-schemas` language subtrees already represent entity schemas.
Wrap each one under `entity` when constructing the public registry:

```ts
const deSchema = {
	entity: deSubtree,
} satisfies NewLanguageSchemaTree<"de">;
```

Repeat for `en` and `he`.

### 3. Export The Registry

Update `src/new-schemas/public-schemas.ts` to export the canonical registry:

```ts
export const schemas = {
	de: {
		entity: deSubtree,
	},
	en: {
		entity: enSubtree,
	},
	he: {
		entity: heSubtree,
	},
} satisfies NewSchemaRegistry;
```

If descriptor schema construction still needs the raw entity subtree map, keep
that as an internal constant:

```ts
const entitySchemasByLanguage = {
	de: deSubtree,
	en: enSubtree,
	he: heSubtree,
} satisfies NewEntitySchemaRegistry;
```

### 4. Add Dynamic Access

Add `getSchemaTreeFor` as a thin accessor:

```ts
export function getSchemaTreeFor<const L extends ConcreteLanguage>(
	language: L,
): (typeof schemas)[L] {
	return schemas[language];
}
```

This function should not perform validation by itself. It is typed for known
`ConcreteLanguage` values. Consumers with untrusted strings should narrow them
before calling it.

### 5. Decide The Published Entrypoint

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

### 6. Remove The Public Runtime-Schema Concept

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

### 7. Update Documentation And Examples

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

### 8. Add Package Entrypoint Tests

Add or update package entrypoint tests to prove:

```ts
import { getSchemaTreeFor, schemas } from "dumling/schema";

const staticSchema = schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
const dynamicSchema = getSchemaTreeFor("de").entity.Selection.Standard.Lemma.Lexeme.NOUN();

staticSchema.parse(value);
dynamicSchema.parse(value);

if (getSchemaTreeFor("de") !== schemas.de) {
	throw new Error("dynamic schema accessor must return registry object");
}
```

Type tests should verify:

```ts
const deTree = getSchemaTreeFor("de");
deTree satisfies NewLanguageSchemaTree<"de">;

declare const language: ConcreteLanguage;
const languageTree = getSchemaTreeFor(language);
languageTree satisfies NewSchemaRegistry[ConcreteLanguage];
```

### 9. Check Build Output

Run the normal verification path after implementation:

```sh
bun run check
bun test
bun run test:package
```

Also inspect the generated `dist/schema.d.ts` to ensure the public entrypoint
does not leak internal old-schema types.

## Acceptance Criteria

- `schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN()` works at runtime.
- `getSchemaTreeFor("de").entity.Selection.Standard.Lemma.Lexeme.NOUN()` works
  at runtime.
- `getSchemaTreeFor("de") === schemas.de`.
- Literal language calls preserve language-specific types.
- `dumling/schema` does not export `runtimeSchemas`.
- `dumling/schema` does not export `deSchema`, `enSchema`, or `heSchema`.
- Package entrypoint tests cover both static registry and dynamic accessor
  usage.
- Documentation only presents the two accepted access patterns.
- Documentation states that leaf calls return Zod schemas for use in validators,
  LLM response-schema callers, and other schema-consuming APIs.

## Open Questions

- Should `ConcreteLanguage` be exported from `dumling/schema`, or should
  consumers import it from `dumling/types`?
- Should descriptor schemas be public in the first version, or kept internal
  until their consumer use cases are clearer?

The current recommendation is to keep language trees stable and to memoize leaf
schemas where construction cost or identity matters. The public API should not
require consumers to care either way. The public contract is only that calling a
leaf getter returns a usable Zod schema object.
