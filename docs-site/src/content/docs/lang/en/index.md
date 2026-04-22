---
title: English
description: English language pack notes.
order: 100
---

# English

English is available at `dumling.en`, `getLanguageApi("en")`, and `schemasFor.en`.

## Supported Lemma Families

English supports the same public lemma families as the other implemented language packs:

| `lemmaKind` | `lemmaSubKind` values |
| --- | --- |
| `Lexeme` | `ADJ`, `ADP`, `ADV`, `AUX`, `CCONJ`, `DET`, `INTJ`, `NOUN`, `NUM`, `PART`, `PRON`, `PROPN`, `PUNCT`, `SCONJ`, `SYM`, `VERB`, `X` |
| `Morpheme` | `Circumfix`, `Clitic`, `Duplifix`, `Infix`, `Interfix`, `Prefix`, `Root`, `Suffix`, `Suffixoid`, `ToneMarking`, `Transfix` |
| `Phraseme` | `Aphorism`, `DiscourseFormula`, `Idiom`, `Proverb` |

## Common Feature Areas

English feature schemas are intentionally narrower than the abstract ontology.

| Subkind | Inherent examples | Inflectional examples |
| --- | --- | --- |
| `NOUN` | `abbr`, `foreign`, `numForm`, `numType`, `style` | `number` |
| `VERB` | `hasGovPrep`, `phrasal`, `style` | `mood`, `number`, `person`, `tense`, `verbForm`, `voice` |
| `ADJ` | `abbr`, `numForm`, `numType`, `style` | `degree` |

English noun `number` supports `Sing`, `Plur`, and `Ptan`. English verb `tense` supports `Past` and `Pres`, and `verbForm` supports `Fin`, `Ger`, `Inf`, and `Part`.

## Example

```ts
import { dumling } from "dumling";

const runLemma = dumling.en.create.lemma({
	canonicalLemma: "run",
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeatures: {},
	meaningInEmojis: "run",
});

const ranSurface = dumling.en.create.surface.inflection({
	lemma: runLemma,
	normalizedFullSurface: "ran",
	inflectionalFeatures: {
		tense: "Past",
		verbForm: "Fin",
	},
});

const ranSelection = dumling.en.convert.surface.toSelection(ranSurface, {
	spelledSelection: "ran",
});

dumling.en.parse.selection(ranSelection);
```

## Schema Access

```ts
schemasFor.en.entity.Lemma.Lexeme.VERB();
schemasFor.en.entity.Surface.Inflection.Lexeme.VERB();
schemasFor.en.entity.Selection.Standard.Inflection.Lexeme.VERB();
```
