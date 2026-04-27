---
title: API
description: Runtime API namespaces and package entrypoints.
order: 30
---

# API

`dumling` exposes separate entrypoints for workflow operations, public types, and schemas.

## Entrypoints

| Import path | Purpose |
| --- | --- |
| `dumling` | Runtime API |
| `dumling/types` | Public DTOs, feature helpers, descriptors, API result types, and ID types |
| `dumling/schema` | Runtime Zod schema registries |

## Runtime API

The root runtime entrypoint exports:

```ts
import {
	dumling,
	getLanguageApi,
	inspectId,
	supportedLanguages,
} from "dumling";
```

The language-bound API is the primary workflow surface:

```ts
const de = dumling.de;
const en = getLanguageApi("en");
```

The implemented language namespaces are:

- `dumling.de`
- `dumling.en`
- `dumling.he`

## create

`create` constructors set namespace-implied fields such as `language` and `surfaceKind`.

```ts
const lemma = dumling.en.create.lemma({
	canonicalLemma: "run",
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeatures: {},
	meaningInEmojis: "🏃",
});

const surface = dumling.en.create.surface.inflection({
	lemma,
	normalizedFullSurface: "ran",
	inflectionalFeatures: {
		tense: "Past",
		verbForm: "Fin",
	},
});

const selection = dumling.en.create.selection({
	surface,
	spelledSelection: "ran",
});
```

## convert

`convert` derives common linked DTOs.

```ts
const surface = dumling.de.convert.lemma.toSurface(lemma);

const selection = dumling.de.convert.surface.toSelection(surface, {
	spelledSelection: "See",
	selectionFeatures: {
		coverage: "Partial",
	},
});
```

Defaults for generated selections are:

- `spelledSelection: surface.normalizedFullSurface`
- omitted `selectionFeatures.orthography` means standard orthography
- omitted `selectionFeatures.coverage` means full coverage
- omitted `selectionFeatures.spelling` means canonical spelling relation

## extract

`extract` retrieves the canonical nested entity from any hydrated value:

```ts
const lemmaFromLemma = dumling.de.extract.lemma(lemma);
const lemmaFromSurface = dumling.de.extract.lemma(surface);
const lemmaFromSelection = dumling.de.extract.lemma(selection);
```

## parse

`parse` validates unknown input against the language runtime schemas.

```ts
const result = dumling.he.parse.selection(input);

if (result.success) {
	result.data.surface.lemma;
} else {
	result.error.code;
	result.error.message;
}
```

## describe

`describe.as` returns descriptors for routing and indexing:

```ts
dumling.en.describe.as.lemma(lemma);
dumling.en.describe.as.surface(surface);
dumling.en.describe.as.selection(selection);
```

## id

Language-bound ID helpers encode and decode hydrated DTOs:

```ts
const id = dumling.en.id.encode(selection);
const decoded = dumling.en.id.decodeAs("Selection", id);
```

`decode` returns both the entity kind and the decoded data. `decodeAs` checks that the ID contains the expected entity kind.

## schemas

The schema entrypoint exports concrete and abstract schema registries:

```ts
import { abstractSchemas, getSchemaTreeFor, schemasFor } from "dumling/schema";
```

Concrete leaf schema getters return Zod schemas:

```ts
schemasFor.de.entity.Lemma.Lexeme.NOUN();
schemasFor.en.entity.Surface.Inflection.Lexeme.VERB();
schemasFor.he.entity.Selection.Inflection.Lexeme.NOUN();
```

Use `getSchemaTreeFor(language)` when the language is only known at runtime.
