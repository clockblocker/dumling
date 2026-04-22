---
title: German
description: German language pack notes.
order: 110
---

# German

German is available at `dumling.de`, `getLanguageApi("de")`, and `schemasFor.de`.

## Supported Lemma Families

| `lemmaKind` | `lemmaSubKind` values |
| --- | --- |
| `Lexeme` | `ADJ`, `ADP`, `ADV`, `AUX`, `CCONJ`, `DET`, `INTJ`, `NOUN`, `NUM`, `PART`, `PRON`, `PROPN`, `PUNCT`, `SCONJ`, `SYM`, `VERB`, `X` |
| `Morpheme` | `Circumfix`, `Clitic`, `Duplifix`, `Infix`, `Interfix`, `Prefix`, `Root`, `Suffix`, `Suffixoid`, `ToneMarking`, `Transfix` |
| `Phraseme` | `Aphorism`, `DiscourseFormula`, `Idiom`, `Proverb` |

## Common Feature Areas

German has richer inflectional coverage than English for nouns and adjectives.

| Subkind | Inherent examples | Inflectional examples |
| --- | --- | --- |
| `NOUN` | `gender`, `hyph` | `case`, `number` |
| `VERB` | `hasGovPrep`, `hasSepPrefix`, `lexicallyReflexive`, `verbType` | `aspect`, `gender`, `mood`, `number`, `person`, `tense`, `verbForm`, `voice` |
| `ADJ` | `abbr`, `foreign`, `numType`, `variant` | `case`, `degree`, `gender`, `number` |

German noun `gender` supports `Fem`, `Masc`, and `Neut`. German nominal and adjectival `case` supports `Nom`, `Acc`, `Dat`, and `Gen`.

## Example

```ts
import { dumling } from "dumling";

const seeLemma = dumling.de.create.lemma({
	canonicalLemma: "See",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {
		gender: "Masc",
	},
	meaningInEmojis: "🌊",
});

const seenSurface = dumling.de.create.surface.inflection({
	lemma: seeLemma,
	normalizedFullSurface: "Seen",
	inflectionalFeatures: {
		case: "Nom",
		number: "Plur",
	},
});

const seenSelection = dumling.de.create.selection.standard({
	surface: seenSurface,
	spelledSelection: "Seen",
	spellingRelation: "Canonical",
	selectionCoverage: "Full",
});

dumling.de.id.encode(seenSelection);
```

## Schema Access

```ts
schemasFor.de.entity.Lemma.Lexeme.NOUN();
schemasFor.de.entity.Surface.Inflection.Lexeme.NOUN();
schemasFor.de.entity.Selection.Standard.Inflection.Lexeme.NOUN();
```
