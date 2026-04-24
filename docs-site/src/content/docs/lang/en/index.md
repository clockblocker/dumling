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
| `Fusion` | `General` |

`Fusion/General` is part of the shared public ontology even though the English examples here focus on lexemes, morphemes, and phrasemes. Fusion entries are citation-only and currently featureless.

## Common Feature Areas

English feature schemas are intentionally narrower than the abstract ontology.

| Subkind | Inherent examples | Inflectional examples |
| --- | --- | --- |
| `NOUN` | `abbr`, `foreign`, `numForm`, `numType`, `style` | `number` |
| `VERB` | `hasGovPrep`, `phrasal`, `style` | `mood`, `number`, `person`, `tense`, `verbForm`, `voice` |
| `ADJ` | `abbr`, `numForm`, `numType`, `style` | `degree` |

English noun `number` supports `Sing`, `Plur`, and `Ptan`. English verb `tense` supports `Past` and `Pres`, and `verbForm` supports `Fin`, `Ger`, `Inf`, and `Part`.

## Attestation Files

English attestation source files live in `src/content/attestations-to-generate/en`. Each file exports exactly one attested dumling object and generates exactly one Markdown attestation.

Lemma and surface attestations are generated from files under `lemma/` and `surface/` with base64url ID basenames. Selection fixtures under `selection/` use semantic basenames derived from `sentenceMarkdown`, while generated Markdown attestation routes still use the API base64url ID returned by `dumling.en.id.encode.asBase64Url(entity)`.

- [`walk`](./attestation/djEscyxjLHdhbGssbCxlbixsLG4sd2Fsayzwn5q2LA/)
- [`walk in the park`](./attestation/djEscyxjLHdhbGsgaW4gdGhlIHBhcmssbCxlbixwLGlkLHdhbGsgaW4gdGhlIHBhcmss8J-YjCw/)
- [`run`](./attestation/djEsbCxlbixsLHYscnVuLPCfj4Ms/)
- [`book`](./attestation/djEsbCxlbixsLG4sYm9vayzwn5OaLA/)
- [`ran`](./attestation/djEscyxpLHJhbix0ZT1wfHZmPWYsbCxlbixsLHYscnVuLPCfj4Ms/)
- [`books`](./attestation/djEscyxpLGJvb2tzLG51PXAsbCxlbixsLG4sYm9vayzwn5OaLA/)

## Example

```ts
import { dumling } from "dumling";

const runLemma = dumling.en.create.lemma({
	canonicalLemma: "run",
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeatures: {},
	meaningInEmojis: "🏃",
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
