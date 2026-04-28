---
title: German
description: German language pack notes.
order: 110
---

# German

German is available at `dumling.de`, `getLanguageApi("de")`, and `schemasFor.de`.

## Doc-Cite Tree

The new doc-cite route tree for German lives under [`/de.html`](/de.html).

Use these overview pages when you want the public classification taxonomy rather than the broader language-pack notes on this page:

- [`/de/entity.html`](/de/entity.html) for `Lemma`, `Surface`, and `Selection`
- [`/de/kind.html`](/de/kind.html) for the four lemma families
- [`/de/pos.html`](/de/pos.html), [`/de/morpheme.html`](/de/morpheme.html), [`/de/phraseme.html`](/de/phraseme.html), and [`/de/construction.html`](/de/construction.html) for concrete inventories
- [`/de/feature.html`](/de/feature.html) and [`/de/feature/selection.html`](/de/feature/selection.html) for public feature routes

## Supported Lemma Families

| `lemmaKind` | `lemmaSubKind` values |
| --- | --- |
| `Lexeme` | `ADJ`, `ADP`, `ADV`, `AUX`, `CCONJ`, `DET`, `INTJ`, `NOUN`, `NUM`, `PART`, `PRON`, `PROPN`, `PUNCT`, `SCONJ`, `SYM`, `VERB`, `X` |
| `Morpheme` | `Circumfix`, `Clitic`, `Duplifix`, `Infix`, `Interfix`, `Prefix`, `Root`, `Suffix`, `Suffixoid`, `ToneMarking`, `Transfix` |
| `Phraseme` | `Aphorism`, `DiscourseFormula`, `Idiom`, `Proverb` |
| `Construction` | `Fusion`, `PairedFrame` |

German uses `Construction/Fusion` for fused forms such as `zum`, `zur`, `beim`, or `ins`, and `Construction/PairedFrame` for learner-facing paired frames such as `um zu`. These are citation-only entries in the current public DTO.

## Common Feature Areas

German has richer inflectional coverage than English for nouns and adjectives.

| Subkind | Inherent examples | Inflectional examples |
| --- | --- | --- |
| `NOUN` | `gender`, `hyph` | `case`, `number` |
| `VERB` | `hasGovPrep`, `hasSepPrefix`, `lexicallyReflexive`, `verbType` | `aspect`, `gender`, `mood`, `number`, `person`, `tense`, `verbForm`, `voice` |
| `ADJ` | `abbr`, `foreign`, `numType`, `variant` | `case`, `degree`, `gender`, `number` |

German noun `gender` supports `Fem`, `Masc`, and `Neut`. German nominal and adjectival `case` supports `Nom`, `Acc`, `Dat`, and `Gen`.

`Construction/Fusion` and `Construction/PairedFrame` currently carry no additional inherent or inflectional features.

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

const seenSelection = dumling.de.create.selection({
	surface: seenSurface,
	spelledSelection: "Seen",
});

dumling.de.id.encode(seenSelection);
```

German fusion example:

```ts
const zumLemma = dumling.de.create.lemma({
	canonicalLemma: "zum",
	lemmaKind: "Construction",
	lemmaSubKind: "Fusion",
	inherentFeatures: {},
	meaningInEmojis: "➡️",
});

const zumSelection = dumling.de.convert.lemma.toSelection(zumLemma, {
	spelledSelection: "zum",
});
```

German paired-frame example:

```ts
const umZuLemma = dumling.de.create.lemma({
	canonicalLemma: "um zu",
	lemmaKind: "Construction",
	lemmaSubKind: "PairedFrame",
	inherentFeatures: {},
	meaningInEmojis: "🎯",
});

const umZuSelection = dumling.de.convert.lemma.toSelection(umZuLemma, {
	selectionFeatures: {
		coverage: "Partial",
	},
	spelledSelection: "zu",
});
```

## Schema Access

```ts
schemasFor.de.entity.Lemma.Lexeme.NOUN();
schemasFor.de.entity.Lemma.Construction.Fusion();
schemasFor.de.entity.Lemma.Construction.PairedFrame();
schemasFor.de.entity.Surface.Inflection.Lexeme.NOUN();
schemasFor.de.entity.Selection.Inflection.Lexeme.NOUN();
schemasFor.de.entity.Selection.Citation.Construction.Fusion();
schemasFor.de.entity.Selection.Citation.Construction.PairedFrame();
```
