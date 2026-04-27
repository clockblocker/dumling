---
title: German Rules
description: Classifier guardrails for German, distilled from limit-testing and reviewer notes.
order: 110
---

# German Rules

This section collects German-specific classifier rules that kept paying for themselves during review. The goal is not to restate UD from scratch, but to pin down the recurring dumling-way choices that were easy to miss during limit-testing.

## Current Pages

- [Selection-Facing Defaults](./selection-facing-defaults/)
- [Prepositions, Fusions, And Governed Verbs](./prepositions-fusions-and-governed-verbs/)
- [Directional Adverbs And Separable Verbs](./directional-adverbs-and-separable-verbs/)
- [Predicative Adjectives And Participles](./predicative-adjectives-and-participles/)
- [Finite Auxiliaries Vs Lexical Verbs](./finite-auxiliaries-vs-lexical-verbs/)
- [Phrasemes, Formulas, And Literal Readings](./phrasemes-formulas-and-literal-readings/)
- [What To Do With Numerals](./what-to-do-with-numerals/)

## Why These First

These pages target the mistakes that showed up repeatedly in `src/classification-logbook/de/reviewer-notes.md` and in `src/classification-logbook/de/de-attested-selections.csv`:

- over-marking sentence-initial capitalization as a spelling variant
- letting phrase-level scene meaning leak into `meaningInEmojis`
- inflating free prepositions into verb analyses
- over-forcing separable-verb analyses for short directional items
- flattening predicative adjectives into adverbs, or recasting participles as adjectives too quickly
- collapsing everything formula-like into phrasemes, or failing to collapse when the larger unit really carries the meaning
- treating every modal-looking or auxiliary-looking finite form as the same POS

## Next Edge Cases Worth Carving Out

- `Citation` vs `Inflection` when the noun surface is citation-shaped but syntax only partly disambiguates the inflectional reading
- lexicalized temporal adjectives like `nächst` versus etymologically related but learner-irrelevant source analyses like `nah`
- same-spelling split-verb frames where token role is recoverable only from the sentence, such as `Pass auf dich auf!`
- intensifier items that alternate between standalone `ADV` readings and fixed idioms, especially `gar`, `sogar`, and `ganz und gar`
- homograph sense disambiguation where gender or context, rather than morphology, does most of the work
