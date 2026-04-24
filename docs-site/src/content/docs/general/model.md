---
title: Model
description: The core dumling DTO model.
order: 20
---

# Model

The public model is built around three hydrated DTOs:

- `Lemma`: the dictionary or lemma-like entry
- `Surface`: the normalized full form in context
- `Selection`: the exact observed highlight in learner text

Selections are always hydrated:

- a `Selection` always contains a `Surface`
- a `Surface` always contains a `Lemma`

## Lemma

<!-- DOC_BLOCK:core-lemma -->

A lemma is the canonical lexical object, or a lemma-like fused entry. It is where you put the language, the canonical form, the broad lemma kind, the concrete lemma subtype, inherent features, and a learner-facing meaning hint.

## Surface

<!-- DOC_BLOCK:core-surface -->

A citation surface uses `surfaceKind: "Citation"` and normally has the canonical lemma spelling as `normalizedFullSurface`.

Fusion entries are citation-only today, so `Fusion/General` only appears under `Surface<Citation>` and never under `Surface<Inflection>`.

An inflection surface uses `surfaceKind: "Inflection"` and adds `inflectionalFeatures`:

```ts
const ranSurface = dumling.en.create.surface.inflection({
	lemma: runLemma,
	normalizedFullSurface: "ran",
	inflectionalFeatures: {
		tense: "Past",
		verbForm: "Fin",
	},
});
```

## Selection

<!-- DOC_BLOCK:core-selection -->

A selection records what was observed in text. The normalized surface stays available through `selection.surface`, and the lemma entry stays available through `selection.surface.lemma`.

## Descriptors

Descriptors are compact structural summaries of DTOs. They are useful when code needs to route by entity kind, language, lemma kind, surface kind, or orthographic status without carrying the whole object through the branch.

```ts
const descriptor = dumling.de.describe.as.selection(seeSelection);

descriptor.entityKind; // "Selection"
descriptor.language; // "de"
descriptor.lemmaKind; // "Lexeme"
descriptor.lemmaSubKind; // "NOUN"
descriptor.surfaceKind; // "Citation"
descriptor.orthographicStatus; // "Standard"
```

## IDs

IDs are stable strings produced from hydrated DTOs. Use the language-bound ID helpers when the caller already knows the language:

```ts
const id = dumling.de.id.encode(seeSelection);
const decoded = dumling.de.id.decodeAs("Selection", id);
```

Use `inspectId(id)` from the root entrypoint when you need metadata before full decoding.

## Runtime Validation

Parsing returns an `ApiResult` instead of throwing:

```ts
const parsed = dumling.de.parse.selection(input);

if (!parsed.success) {
	console.error(parsed.error.code, parsed.error.issues);
}
```

The schema entrypoint exposes concrete Zod schemas when a caller needs direct validator access:

```ts
schemasFor.de.entity.Selection.Standard.Citation.Lexeme.NOUN().parse(value);
```
