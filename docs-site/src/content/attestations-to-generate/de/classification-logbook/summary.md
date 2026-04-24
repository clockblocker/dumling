### Common Mistakes



### Locked-In Rules

The finite verb token, the governed preposition token, and the separated prefix token of the same separable verb construction should point to the same normalized verbal surface when they belong to one attested verb form.

Example: in `Pass [auf] dich auf!`, the selected governed preposition `auf` should still use `normalizedFullSurface: "pass auf"` and the lemma `aufpassen`, rather than being classified as a standalone ADP.

Governed prepositions are expluded from "normalizedFullSurface". Thir only place is place is in `lemma.inherentFeatures.hasGovPrep: "{governed preposition}"`
