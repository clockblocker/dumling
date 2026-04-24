---
title: Linguistics
description: Domain terms used by dumling.
order: 10
---

# Linguistics

`dumling` models learner-facing linguistic annotation. The package does not try to be a full grammar engine. It gives applications stable objects for the parts of annotation that commonly need to be validated, serialized, searched, and shown back to learners.

## Lemma

A `Lemma` is the dictionary entry, or lemma-like entry, behind an observed form.

For a word like `Seen`, the German lemma might be `See`. For an English form like `ran`, the lemma might be `run`.

The lemma owns properties that belong to the lemma entry itself:

- `language`: the concrete language, such as `de`, `en`, or `he`
- `canonicalLemma`: the canonical lemma spelling
- `lemmaKind`: the broad class: `Lexeme`, `Morpheme`, `Phraseme`, or `Fusion`
- `lemmaSubKind`: the concrete subtype, such as `NOUN`, `VERB`, `Prefix`, or `Idiom`
- `inherentFeatures`: features that belong to the lemma as a lexical item
- `meaningInEmojis`: a compact meaning hint for learner-facing UI

`Fusion/General` is the public lemma-like branch for fused forms such as German `zum`, `zur`, `beim`, or `ins`, when the API should preserve the fused form instead of forcing a decomposed lexical analysis.

## Surface

A `Surface` is the normalized full form in context.

The surface always contains a `Lemma`. This keeps a normalized word form connected to the lemma entry it realizes.

There are two surface kinds:

- `Citation`: the surface is the citation form itself
- `Inflection`: the surface is an inflected form of the lemma

Inflection surfaces carry `inflectionalFeatures`, such as number, case, tense, person, gender, degree, definiteness, or verb form, depending on the language and lemma subtype.

## Selection

A `Selection` is the exact string the learner highlighted.

The selection always contains a `Surface`, and that surface always contains a `Lemma`. This gives the full chain:

```txt
Selection -> Surface -> Lemma
```

`Selection` has three independent annotation axes:

| Field | Values | Meaning |
| --- | --- | --- |
| `orthographicStatus` | `Standard`, `Typo` | whether the observed spelling is standard or a typo |
| `selectionCoverage` | `Full`, `Partial` | whether the learner highlighted the whole surface or part of it |
| `spellingRelation` | `Canonical`, `Variant` | whether the spelling is canonical or an accepted variant |

A typo can still be a variant, and a partial selection can still point to a full normalized surface. These fields describe different facts.

## Lemma Kinds

`lemmaKind` has four values:

| Kind | Use |
| --- | --- |
| `Lexeme` | words and word-like lexical entries, categorized with Universal Dependencies-style POS tags |
| `Morpheme` | roots, prefixes, suffixes, clitics, and related sub-word units |
| `Phraseme` | multi-word or formulaic expressions such as idioms and proverbs |
| `Fusion` | lemma-like fused forms that should stay intact as one public entry, such as German `zum` or `beim` |

`lemmaSubKind` is the public subtype field for all four families. The package does not expose separate public discriminator names like `pos`, `morphemeKind`, or `phrasemeKind`.

## Features

Features are split by where they belong:

- `inherentFeatures` describe the lemma itself
- `inflectionalFeatures` describe a concrete inflected surface

Each language narrows the abstract feature inventory. For example, German nouns support grammatical gender as an inherent feature and case/number as inflectional features. English nouns support number inflection but not grammatical case in the same way. Hebrew supports language-specific features such as `hebBinyan` for verbs.
