# Common Mistakes

## Typo Handling

Only `selection.spelledSelection` may preserve a misspelling. `selection.surface.normalizedFullSurface` must stay canonical.

## Non-Fixed Phrases

If the selected material is not part of a fixed expression, do not inflate it into a phraseme analysis. Fall back to UD-style token segmentation instead.

## Emoji Semantics

`meaningInEmojis` must represent the meaning of the selected lexical item itself, not a nearby noun or the general sentence scene.

## Reviewer Hesitation

Do not treat obvious fixed expressions as suspicious just because the selected span covers only one component. `nur Bahnhof verstehen`, `den Nagel auf den Kopf treffen`, `da liegt der Hase im Pfeffer`, and `Morgenstund hat Gold im Mund` are valid partial-phraseme cases.

# Locked-In Rules

## Typo Attestations

Keep the typo in `selection.spelledSelection` and keep `selection.surface.normalizedFullSurface` canonical.

## Partial Phraseme Selection

For clear idioms, proverbs, and other fixed expressions, `selectionCoverage: "Partial"` plus the full citation-form phraseme surface is the correct analysis.

## Discontinuous Morphemes

A visible segment such as `ge` may be a `Partial` selection of a discontinuous morpheme lemma such as `ge-...-t`. That remains `Citation`, not `Inflection`.

## Adpositions

For non-fixed phrases like `[Wegen] dem Regen`, use a plain lexical `ADP` analysis rather than a phraseme-style inflation. Avoid prescriptive inherent features that are not supported by the attested usage.

## Emoji Semantics

When classifying part of a phrase, `meaningInEmojis` must still describe the selected lexical item.

## Verb

#### Governed Prepositions

Governed prepositions must not be encoded in `normalizedFullSurface`.

Encode verbal government only in `lemma.inherentFeatures.hasGovPrep: "{governed preposition}"`.

Use `normalizedFullSurface` for the attested verbal surface only.

Example:

In `Pass [auf] dich auf!`, the selected `auf` is not a standalone ADP. It remains anchored to the verb lemma `aufpassen`, with:

- `normalizedFullSurface: "pass auf"`
- `lemma.inherentFeatures.hasGovPrep: "auf"`
- `lemma.inherentFeatures.hasSepPrefix: "auf"`

Do not create a surface such as `aufpassen auf` just to represent the governed preposition.

Sources:

- `docs-site/src/content/attestations-to-generate/de/selection/Pass_auf_dich_auf/Pass_[auf]_dich_auf.ts`
- `docs-site/src/content/attestations-to-generate/de/selection/Er_wartet_auf_den_Nachtbus/Er_[wartet]_auf_den_Nachtbus.ts`
