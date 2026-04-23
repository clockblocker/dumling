# English Selection Stress-Test Decisions

This log accompanies the generated EN selection attestations with orders 100-149.
Each row records a non-obvious modeling choice that came up while creating edge-case fixtures.

| Order | Surface | Selection | Classification | Decision |
| --- | --- | --- | --- | --- |
| 100 | `read` | `read` | `Standard` `Full` `Inflection` `Lexeme/VERB` | Past-tense read is orthographically identical to the citation form; the distinction lives only in surfaceKind and inflectionalFeatures. |
| 101 | `lead` | `lead` | `Standard` `Full` `Citation` `Lexeme/VERB` | Verb lead is kept separate from noun lead despite identical spelling. |
| 102 | `lead` | `lead` | `Standard` `Full` `Citation` `Lexeme/NOUN` | Material lead is a noun lexeme; pronunciation is not represented in the current model. |
| 103 | `wind` | `wind` | `Standard` `Full` `Citation` `Lexeme/VERB` | Wind as a verb is modeled separately from wind as weather; pronunciation contrast is outside the object. |
| 104 | `wind` | `wind` | `Standard` `Full` `Citation` `Lexeme/NOUN` | Wind as weather is a noun citation surface sharing spelling with the verb wind. |
| 105 | `saw` | `saw` | `Standard` `Full` `Inflection` `Lexeme/VERB` | Saw is the past finite surface of see, not the citation noun saw. |
| 106 | `saw` | `saw` | `Standard` `Full` `Citation` `Lexeme/NOUN` | Tool saw is a noun citation surface; the model can keep it distinct from the verb surface saw. |
| 107 | `data` | `data` | `Standard` `Full` `Inflection` `Lexeme/NOUN` | Data is treated as a plural inflection of datum, even though contemporary usage often treats data as mass/singular. |
| 108 | `scissors` | `scissors` | `Standard` `Full` `Inflection` `Lexeme/NOUN` | Scissors uses Number=Ptan to stress plurale-tantum support. |
| 109 | `Smiths` | `Smiths` | `Standard` `Full` `Inflection` `Lexeme/PROPN` | Family-name plural is PROPN with inflectional number rather than a common NOUN. |
| 110 | `better` | `better` | `Standard` `Full` `Inflection` `Lexeme/ADJ` | Irregular comparative better is attached to the lemma good with Degree=Cmp. |
| 111 | `best` | `best` | `Standard` `Full` `Inflection` `Lexeme/ADV` | Best is modeled as superlative adverb here, not adjective, because it modifies performed. |
| 112 | `were` | `were` | `Standard` `Full` `Inflection` `Lexeme/AUX` | Were in if I were you is AUX with Mood=Sub; the schema allows mood without forcing person/number. |
| 113 | `does` | `Does` | `Standard` `Full` `Inflection` `Lexeme/AUX` | Capitalized sentence-initial Does keeps normalizedFullSurface lowercase while spelledSelection preserves casing. |
| 114 | `written` | `written` | `Standard` `Full` `Inflection` `Lexeme/VERB` | Voice=Pass is context-sensitive for English participles; included to test whether the model accepts contextual morphology. |
| 115 | `running` | `Running` | `Standard` `Full` `Inflection` `Lexeme/VERB` | Gerund running is a VERB inflection, not a noun, despite occupying a nominal clause position. |
| 116 | `they` | `They` | `Standard` `Full` `Inflection` `Lexeme/PRON` | They is marked plural because the current English PRON schema has number but no singular-they semantic flag. |
| 117 | `them` | `them` | `Standard` `Full` `Inflection` `Lexeme/PRON` | Them is an accusative surface of they; singular-they readings are not separately encoded. |
| 118 | `whose` | `Whose` | `Standard` `Full` `Inflection` `Lexeme/PRON` | Whose is attached to who with possessive/interrogative inherent features and genitive surface case. |
| 119 | `that` | `that` | `Standard` `Full` `Citation` `Lexeme/DET` | That before a noun is DET, distinct from pronominal and complementizer that. |
| 120 | `that` | `That` | `Standard` `Full` `Citation` `Lexeme/PRON` | Standalone that is PRON; same surface string as DET and SCONJ examples. |
| 121 | `that` | `that` | `Standard` `Full` `Citation` `Lexeme/SCONJ` | Complementizer that is SCONJ; no clause-type feature exists, so POS carries the distinction. |
| 122 | `like` | `like` | `Standard` `Full` `Citation` `Lexeme/SCONJ` | Like as a subordinator is marked SCONJ with vernacular style because many registers prefer as. |
| 123 | `up` | `up` | `Standard` `Full` `Citation` `Lexeme/PART` | Particle up in a phrasal verb is modeled as PART, separate from adposition/adverb uses. |
| 124 | `-` | `-` | `Standard` `Full` `Citation` `Lexeme/SYM` | Minus sign is SYM rather than PUNCT because it functions as a mathematical sign. |
| 125 | `...` | `...` | `Standard` `Full` `Citation` `Lexeme/PUNCT` | Three-dot ellipsis is kept ASCII in the surface to match the attested spelling, with PUNCT as the lemma subkind. |
| 126 | `#` | `#` | `Standard` `Full` `Citation` `Lexeme/SYM` | The symbol surface # points to a worded canonical lemma number sign. |
| 127 | `OK` | `OK` | `Standard` `Full` `Citation` `Lexeme/INTJ` | OK is treated as a standard spelling variant of the canonical lemma okay. |
| 128 | `e-mail` | `e-mail` | `Standard` `Full` `Citation` `Lexeme/NOUN` | Hyphenated e-mail is a standard variant of email, not a typo. |
| 129 | `definitely` | `definately` | `Typo` `Full` `Citation` `Lexeme/ADV` | Definately is a typo of definitely; spellingRelation remains Canonical because the intended standard spelling is canonical, not a licensed variant. |
| 130 | `accommodation` | `acommodation` | `Typo` `Full` `Citation` `Lexeme/NOUN` | Acommodation is represented as Typo with normalized surface accommodation; no edit-distance metadata exists. |
| 131 | `look up` | `look` | `Standard` `Partial` `Citation` `Lexeme/VERB` | Discontinuous phrasal verb look ... up is approximated as Partial selection of citation surface look up. |
| 132 | `take off` | `take` | `Standard` `Partial` `Citation` `Lexeme/VERB` | Only the verb component is selected, but the lemma/surface is the phrasal verb take off. |
| 133 | `depend on` | `depend` | `Standard` `Partial` `Citation` `Lexeme/VERB` | Depend on uses hasGovPrep rather than phrasal because on is governed by the verb. |
| 134 | `spill the beans` | `spilled` | `Standard` `Partial` `Citation` `Phraseme/Idiom` | Inflected spilled is selected inside an idiom, but Phraseme currently has Citation surfaces only, so this is Partial selection of citation form. |
| 135 | `kick the bucket` | `kicked` | `Standard` `Partial` `Citation` `Phraseme/Idiom` | The literal verb is inflected in the sentence, but the idiom entry stays citation-form only. |
| 136 | `by and large` | `By and large` | `Standard` `Full` `Citation` `Phraseme/Idiom` | Sentence-initial capitalization is preserved in spelledSelection only. |
| 137 | `no worries` | `No worries` | `Standard` `Full` `Citation` `Phraseme/DiscourseFormula` | No worries is a discourse formula rather than compositional negation plus noun. |
| 138 | `my bad` | `My bad` | `Standard` `Full` `Citation` `Phraseme/DiscourseFormula` | My bad is categorized by discourse function Apology, not by the adjective bad. |
| 139 | `see you later` | `See` | `Standard` `Partial` `Citation` `Phraseme/DiscourseFormula` | Only See is selected, but the intended formula is see you later. |
| 140 | `the early bird catches the worm` | `early bird` | `Standard` `Partial` `Citation` `Phraseme/Proverb` | Partial proverb selection tests whether the model recovers the full proverb from a salient fragment. |
| 141 | `less is more` | `less is more` | `Standard` `Full` `Citation` `Phraseme/Aphorism` | Less is more is treated as Aphorism rather than Proverb because it states a maxim without narrative proverb form. |
| 142 | `un-` | `un` | `Standard` `Partial` `Citation` `Morpheme/Prefix` | The canonical prefix contains a hyphen, but the selected substring inside a word does not; marked Variant and Partial. |
| 143 | `-ish` | `ish` | `Standard` `Partial` `Citation` `Morpheme/Suffix` | The suffix citation includes a leading hyphen, while the attested substring omits it. |
| 144 | `ll` | `ll` | `Standard` `Partial` `Citation` `Morpheme/Clitic` | The apostrophe is outside the selected substring; spellingRelation flags the mismatch against the clitic lemma. |
| 145 | `bio` | `bio` | `Standard` `Partial` `Citation` `Morpheme/Root` | Bio is modeled as a bound root in bioreactor, not as a free clipping of biography. |
| 146 | `bloody` | `bloody` | `Standard` `Partial` `Citation` `Morpheme/Infix` | Expletive insertion is classified as Infix to stress an edge case that is morphologically debatable. |
| 147 | `COVID-ish` | `COVID-ish` | `Standard` `Full` `Citation` `Lexeme/X` | Hybrid nonce token is X with Foreign=Yes because it resists clean POS assignment in isolation. |
| 148 | `half` | `half` | `Standard` `Full` `Citation` `Lexeme/DET` | Half before a noun phrase is DET with fractional number features, not NUM. |
| 149 | `twenty-first` | `twenty-first` | `Standard` `Full` `Citation` `Lexeme/ADJ` | Hyphenated ordinal modifying a noun is ADJ with ordinal number features. |
