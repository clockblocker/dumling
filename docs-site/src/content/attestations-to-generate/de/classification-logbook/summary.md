# Common Mistakes

-

# Locked-In Rules

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
