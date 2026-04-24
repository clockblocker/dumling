# Common Mistakes

## Typo Handling

Only `selection.spelledSelection` may preserve a misspelling. `selection.surface.normalizedFullSurface` must stay canonical.

Sources:

- `Im_Heft_stand_[Filosofie]_statt_Philosophie.ts`

## Non-Fixed Phrases

If the selected material is not part of a fixed expression, do not inflate it into a phraseme analysis. Fall back to UD-style token segmentation instead.

Sources:

- `[Wegen]_dem_Regen_kamen_wir_zu_spät.ts`

## Emoji Semantics

`meaningInEmojis` must represent the meaning of the selected lexical item itself, not a nearby noun or the general sentence scene.

Sources:

- `[Wegen]_dem_Regen_kamen_wir_zu_spät.ts`

## Reviewer Hesitation

Do not treat obvious fixed expressions as suspicious just because the selected span covers only one component. `nur Bahnhof verstehen`, `den Nagel auf den Kopf treffen`, `da liegt der Hase im Pfeffer`, and `Morgenstund hat Gold im Mund` are valid partial-phraseme cases.

Sources:

- `Bei_dieser_Formel_verstehe_ich_nur_[Bahnhof].ts`
- `Damit_triffst_du_den_[Nagel]_auf_den_Kopf.ts`
- `Genau_da_liegt_der_[Hase]_im_Pfeffer.ts`
- `[Morgenstund]_hat_Gold_im_Mund_sagte_sie_verschlafen.ts`

# Locked-In Rules

## Typo Attestations

Keep the typo in `selection.spelledSelection` and keep `selection.surface.normalizedFullSurface` canonical.

Sources:

- `Im_Heft_stand_[Filosofie]_statt_Philosophie.ts`

## Partial Phraseme Selection

For clear idioms, proverbs, and other fixed expressions, `selectionCoverage: "Partial"` plus the full citation-form phraseme surface is the correct analysis.

Sources:

- `Bei_dieser_Formel_verstehe_ich_nur_[Bahnhof].ts`
- `Damit_triffst_du_den_[Nagel]_auf_den_Kopf.ts`
- `Genau_da_liegt_der_[Hase]_im_Pfeffer.ts`
- `[Morgenstund]_hat_Gold_im_Mund_sagte_sie_verschlafen.ts`

## Discontinuous Morphemes

A visible segment such as `ge` may be a `Partial` selection of a discontinuous morpheme lemma such as `ge-...-t`. That remains `Citation`, not `Inflection`.

Sources:

- `In_[ge]lacht_markieren_ge_und_t_zusammen_das_Partizip.ts`

## Adpositions

For non-fixed phrases like `[Wegen] dem Regen`, use a plain lexical `ADP` analysis rather than a phraseme-style inflation. Avoid prescriptive inherent features that are not supported by the attested usage.

Sources:

- `[Wegen]_dem_Regen_kamen_wir_zu_spät.ts`

## Emoji Semantics

When classifying part of a phrase, `meaningInEmojis` must still describe the selected lexical item.

Sources:

- `[Wegen]_dem_Regen_kamen_wir_zu_spät.ts`

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

- `Pass_[auf]_dich_auf.ts`
- `Er_[wartet]_auf_den_Nachtbus.ts`
