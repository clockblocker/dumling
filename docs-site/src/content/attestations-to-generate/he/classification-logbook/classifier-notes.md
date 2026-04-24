### Classifier Notes

# Hebrew Selection Stress Cases - Decision Log

This log accompanies the 50 Hebrew (`he`) selection attestations in `selection/`.
The goal is not to provide a gold-standard corpus, but to stress-test the model with
attestations that force segmentation, POS, phraseme, spelling, and feature choices.

## Global Decisions

- These are all `Selection` attestations, matching the English selection examples.
- File names are generated from `dumling.he.id.encode.asBase64Url(selection)`.
  Selection IDs use the linked `Surface`; `spelledSelection`,
  `selectionCoverage`, `orthographicStatus`, and `spellingRelation` do not change
  the ID. Homographs are therefore separated by different surface/lemma/POS data.
- Hebrew forms are unvocalized. `normalizedFullSurface` records the normalized
  target form, while `spelledSelection` records the learner-facing selected form.
- `selectionCoverage: "Full"` means the selection covers the modeled surface.
  A selected prefix or clitic can still be `Full` if the modeled surface is the
  morpheme itself.
- `selectionCoverage: "Partial"` is reserved for selected text inside a larger
  modeled surface, such as one word inside an idiom or the lexical base inside a
  prefixed definite noun.
- Hebrew present-like verbal forms are modeled as `verbForm: "Part"` because the
  current Hebrew verb schema allows `Past` and `Fut` tense, but not `Pres`.
- The definite article is modeled two ways on purpose: standalone `ה` as `DET`,
  and prefixed forms such as `הספרים` as noun/adjective inflections with
  `definite: "Def"`.
- Phrasemes use citation surfaces and empty feature sets; the challenge is their
  boundary and subtype, not inflection.
- Typos and spelling variants point at a normalized surface. The typo case uses
  `orthographicStatus: "Typo"`; the plene/defective spelling case uses
  `spellingRelation: "Variant"`.

## Case Decisions

| Order | Surface / selection | Decision |
| --- | --- | --- |
| 100 | `שלום` | Treated as `Phraseme/DiscourseFormula`, not the noun "peace", because the sentence is a greeting. |
| 101 | `תודה` | Treated as a thanks formula, not a standalone noun. |
| 102 | `בבקשה` | Treated as a request politeness formula, despite containing the noun `בקשה`. |
| 103 | `מה נשמע` | Multiword greeting is one discourse formula surface. |
| 104 | `נו` | Kept as `INTJ` rather than discourse formula because it functions as a prompting interjection. |
| 105 | `חס וחלילה` | Idiom subtype, since the literal pieces are not the learner-facing meaning. |
| 106 | `פנים` inside `על הפנים` | Partial selection against the whole idiom `על הפנים`; not a noun attestation. |
| 107 | `לא דובים ולא יער` | Classified as `Idiom`; it is proverb-like, but used here as a fixed idiomatic denial. |
| 108 | `תפסת` inside `תפסת מרובה לא תפסת` | Partial selection against a proverb, not the verb `תפסת`. |
| 109 | `חדש` inside `אין חדש תחת השמש` | Partial selection against a proverb, not an adjective surface. |
| 110 | `את` | Accusative marker as `ADP` with `case: "Acc"`, separated from the pronoun homograph. |
| 111 | `של` | Genitive relation marker as `ADP` with `case: "Gen"`. |
| 112 | `בגלל` | Multi-letter adposition with no case feature; sentence context is causal. |
| 113 | `כאשר` | `SCONJ` with temporal `case: "Tem"` because the schema exposes that feature for Hebrew subordinators. |
| 114 | `ו` | Modeled as a `Morpheme/Clitic`, not `CCONJ`, to stress bound orthographic attachment. |
| 115 | `ה` | Standalone article as `DET` with `pronType: "Art"`, not a noun definiteness feature. |
| 116 | `ב` | Prefix morpheme, even though it corresponds semantically to a preposition. |
| 117 | `ל` | Prefix morpheme, not a full adposition lexeme, because it is selected inside an attached form. |
| 118 | `ש` | Prefix morpheme for the bound complementizer/relative marker. |
| 119 | `כתב` root | Root morpheme, not the homographic past-tense verb. |
| 120 | `כתבה` | Verb `כתב` in past feminine singular, despite the homographic noun "article". |
| 121 | `כתב` | Verb inflection, distinguished from the root morpheme and from noun-like uses. |
| 122 | `נכתב` | `NIFAL` passive-like form with `voice: "Pass"`. |
| 123 | `התכתב` | `HITPAEL` with `voice: "Mid"` to expose reflexive/reciprocal middle behavior. |
| 124 | `מכתבים` | Plural noun from `מכתב`, not a verb-root attestation. |
| 125 | `בתי` | Construct plural of `בית`, using `definite: "Cons"` and `number: "Plur"`. |
| 126 | `ידיים` | Dual number surface for a paired body part. |
| 127 | `בית` selected in `הבית` | Partial selection against a definite noun surface; the omitted `ה` still drives `definite: "Def"`. |
| 128 | `הספרים` | Full selection of a definite plural noun surface. |
| 129 | `גדולה` | Feminine singular adjective inflection. |
| 130 | `גדולים` | Masculine plural adjective inflection. |
| 131 | `הטובות` | Definite feminine plural adjective surface, preserving article agreement. |
| 132 | `אני` | First-person pronoun has person/number but no gender feature. |
| 133 | `את` | Pronoun homograph of the accusative marker, modeled with feminine second-person features. |
| 134 | `הם` | Third-person masculine plural pronoun. |
| 135 | `איזה` | Interrogative determiner, not pronoun, because it modifies `רחוב`. |
| 136 | `שתי` | Numeral construct/dual/feminine form of `שתיים`; intentionally awkward for feature boundaries. |
| 137 | `2026` | Numeric token as `NUM` citation, not `SYM`, to stress digit handling in Hebrew context. |
| 138 | `ירושלים` | Proper noun with feminine inherent gender and singular surface number. |
| 139 | `תל אביב` | Multiword proper noun citation, with no inflectional surface features. |
| 140 | `צה"ל` | Abbreviated proper noun with quote mark retained and `abbr: "Yes"`. |
| 141 | `יש` | Existential verb lemma using `hebExistential: "Yes"`, not an adverb/particle. |
| 142 | `אין` | Negative existential also uses `hebExistential: "Yes"`; negativity is lexical here, not an inflectional polarity feature. |
| 143 | `אוכל` | Future first-person verb from `אכל`, separated from the noun homograph. |
| 144 | `אוכל` | Noun "food", separated from the future verb homograph by lemma/POS. |
| 145 | `הולכים` | Present-like form represented as `verbForm: "Part"` rather than `tense: "Pres"`. |
| 146 | `תלך` in `אל תלך` | Verb carries `polarity: "Neg"` because the negative command context matters, even though `אל` is separate. |
| 147 | `בואו` | Imperative plural with `mood: "Imp"`, avoiding tense. |
| 148 | `לכתי` | Typo selection normalized to `הלכתי`; the missing `ה` is captured by `orthographicStatus: "Typo"`. |
| 149 | `אמא` / `אימא` | Defective/plene accepted spelling variation: selected spelling `אמא`, normalized surface `אימא`, `spellingRelation: "Variant"`. |

### Open Questions

-
