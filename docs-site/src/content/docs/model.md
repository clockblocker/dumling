---
title: Model
description: The core dumling DTO model.
order: 10
---

# Model

`dumling` keeps three linked DTOs separate:

- `Lemma`: the dictionary lemma
- `Surface`: the normalized full form in context
- `Selection`: the exact text the learner highlighted

Selections are always hydrated:

- a `Selection` always contains a `Surface`
- a `Surface` always contains a `Lemma`

## Lemma

<!-- DOC_BLOCK:core-lemma -->

## Surface

<!-- DOC_BLOCK:core-surface -->

## Selection

<!-- DOC_BLOCK:core-selection -->
