# `dumling`

Typesafe schemas, types, IDs, and operations for practical, learner-facing segmentation of text.

The package models three linked layers:

- `Selection`: what the user actually highlighted
- `Surface`: the normalized full form that highlight belongs to
- `Lemma`: the normalized dictionary form assigned to that surface

It currently exposes curated registries for `English`, `German`, and `Hebrew`, plus relation helpers for lexical and morphological links.

## Core idea

A learner reads:

```text
Mark gave up on it
```

They select only part of the expression:

```text
Mark gave [up] on it
```

That is still a valid classification. The selection is partial, but the deeper layers stay intact: the full surface is the inflected form `gave up`, and the lemma is `give up`.

<!-- README_BLOCK:core-simple-selection -->

And the assigned lemma can be validated independently:

`meaningInEmojis` is part of lemma identity and should describe the sense itself, not the literal imagery of the written form. For `giveUpLemma`, the interesting identity fields are `canonicalLemma: "give up"`, `inherentFeatures.phrasal: "Yes"`, and `meaningInEmojis: "🏳️"`.

This gives you three orthogonal axes of strictness:

- `orthographicStatus`: whether the spelling is standard, a recognized typo, or unknown
- `spellingRelation`: whether a known spelling is the canonical one or an accepted variant
- `selectionCoverage`: whether the user highlighted the whole surface or only part of it

A recognized typo does not need to break deeper classification if the surface is still recognizable, and a partial selection does not need to discard the full surface or its lemma.

Selection-level `spellingRelation` is separate from the UD feature `variant`. The former links obvious spelling alternants such as `armor` / `armour`; the latter stays a lexical feature where UD needs it.

The model borrows from UD, but stays learner-facing, especially around multi-token and compounded units.

For example, the same separation also allows classifying the idiom in

```text
This game was a [walk] in the park
```

as part of the idiom `a walk in the park`, directly at the lemma-surface layer. In `idiomPartSelection`, the interesting part is `surfaceKind: "Lemma"` together with `target.lemmaKind: "Phraseme"` and `target.phrasemeKind: "Idiom"`.

Spelling variants now live on the selection, not on `surfaceKind`. The surface stays structural (`Lemma` or `Inflection`), while the selection records whether the observed spelling is canonical or an accepted variant.

For plain spelling alternants such as `armor` / `armour`:

`armourSelection` keeps `spellingRelation: "Variant"` while `target.canonicalLemma` stays `armor`.

And the same mechanism works for inflected Hebrew forms, including pointed vs unpointed spellings:

`pointedHebrewSelection` keeps `spellingRelation: "Variant"` while `target.canonicalLemma` stays `כתב`.

The DTO keeps the learner-facing selection separate from the deeper linguistic layers:

- the language shared by the selection, surface, and lemma: `language`
- the actual highlighted text in the note: `spelledSelection`
- whether that spelling is canonical or an accepted variant: `spellingRelation`
- whether the user highlighted the whole surface or only part of it: `selectionCoverage`
- the full orthographically normalized surface that the highlighted text belongs to: `normalizedFullSurface`
- the lexical target that the surface resolves to: `target.canonicalLemma`

In a partial multi-token selection, the model still preserves both the target lemma and the realized normalized surface. For example, `giveUpPartialSelection` targets `give up` while its surface is `gave up`; a German counterpart such as `passAufSelection` can target `aufpassen` while its surface is `pass auf`.

This allows for both:

1. pointing the user to the most meaningful target in the actual sentences:

```text
(text reading mode on)
Hans, [Pass] auf dich auf! -> aufpassen (VERB | separable | with governed prep)
Hans, Pass [auf] dich auf! -> aufpassen (VERB | separable | with governed prep)
Hans, Pass auf [dich] auf! -> du (PRON)
Hans, Pass auf dich [auf]! -> aufpassen (VERB | separable | with governed prep)
```

2. drilling down for the actual linguistics:

```text
(linguistic investigation mode on)
Hans, [Pass] auf dich auf! -> `aufpassen` (VERB | separable | with governed prep)
Hans, Pass [auf] dich auf! -> `auf` (ADP)
Hans, Pass auf [dich] auf! -> `du` (PRON)
Hans, Pass auf dich [auf]! -> `auf` (PRT)
```
