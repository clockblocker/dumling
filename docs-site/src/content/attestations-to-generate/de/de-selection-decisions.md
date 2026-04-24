# German attestation stress-test decisions

This log records non-obvious choices made while generating the German selection attestations in `docs-site/src/content/attestations-to-generate/de/selection`. The goal of the batch is to stress-test linguistic classification, not to present a tidy beginner corpus.

## Global decisions

- Every new source is a `Selection` because the requested example was a selection attestation and selections let us stress partial highlights, typos, fused forms, and phraseme internals.
- Filenames are generated with `dumling.de.id.encode.asBase64Url(selection)`; the docs generator requires that exact ID as the basename.
- Selection IDs now include selection metadata, so entries that differ only by selected substring or spelling no longer collide unless the full selection payload matches.
- Capitalization in German sentences is preserved in `spelledSelection` and `sentenceMarkdown`, while `normalizedFullSurface` follows the attested surface and may be normalized by the encoder.
- For homographs with identical grammar, I used `meaningInEmojis` and attestation titles to keep the intended sense inspectable. That is intentionally questionable because the current model does not have a richer sense ID.
- For fused forms such as `zum`, `ins`, `zur`, and `beim`, use `Fusion/General` as a lemma-like citation entry. The fusion itself is both canonical lemma and citation surface; finer decomposition is outside the current public DTO.
- For partial phraseme selections, the selected token is not classified compositionally; the full phraseme is the surface/lemma and `selectionCoverage` is `Partial`.
- For bound morphemes, the canonical lemma keeps hyphen/dot notation where useful, while `spelledSelection` may contain only the visible learner-selected characters.

## Per-attestation notes

| # | Title | Surface | Decision |
| --- | --- | --- | --- |
| 1 | Seen: plural of See | `Seen` | Plural noun with masculine lemma See; capitalized surface is normalized by the encoder. |
| 2 | Band: ribbon | `Band` | Homograph Band as neuter ribbon/tape, kept separate from music group and book volume by lemma features/emoji. |
| 3 | Band: music group | `Band` | Same spelling as neuter Band but feminine lexical item in this sense. |
| 4 | Band: book volume | `Band` | Same spelling again, masculine lexical item meaning volume; stresses homograph/gender disambiguation. |
| 5 | Leiter: ladder | `Leiter` | Homograph with feminine gender for the ladder sense. |
| 6 | Leiter: manager | `Leiter` | Homograph with masculine gender for the person role. |
| 7 | Kiefer: jaw | `Kiefer` | Homograph as masculine jaw. |
| 8 | Kiefer: pine | `Kiefer` | Homograph as feminine pine tree. |
| 9 | Mutter: mother | `Mutter` | Same spelling and gender as the hardware sense, differentiated only by meaning emoji. |
| 10 | Mutter: nut | `Mutter` | Questionable because lexical features match the kinship noun; semantic disambiguation rests on emoji/title. |
| 11 | Schloss: castle | `Schloss` | Homograph with identical grammatical features, castle sense. |
| 12 | Schloss: lock | `Schloss` | Homograph with identical grammatical features, lock sense. |
| 13 | Kindern: dative plural | `Kindern` | Dative plural noun with plural -n; surface features carry both case and number. |
| 14 | Herzen: weak dative singular | `Herzen` | Weak-looking ending on a neuter noun; annotated as dative singular, not plural. |
| 15 | Namen: weak noun dative singular | `Namen` | Surface could be plural elsewhere; here dative singular of weak masculine Name. |
| 16 | Umfuhr: inseparable umfahren | `umfuhr` | Inseparable umfahren, past finite; no separable-prefix feature. |
| 17 | Fuhr um: separable umfahren | `fuhr um` | Discontinuous separable verb compressed into full surface fuhr um; selected spelling is only the finite verb token. |
| 18 | Übersetzt: finite translate | `übersetzt` | Ambiguous surface übersetzt is taken as present finite, not participle. |
| 19 | Übergesetzt: ferry across participle | `übergesetzt` | Related spelling but different sense; participle with aspect Perf. |
| 20 | Erinnert: reflexive verb | `erinnert` | Lexically reflexive lemma, but selected token excludes sich; reflexivity is inherent on the lemma. |
| 21 | Wartet: governed preposition | `wartet` | The governed preposition auf is an inherent lemma feature, not part of the surface selection. |
| 22 | Gewesen: auxiliary participle | `gewesen` | AUX participle rather than lexical VERB; aspect Perf is the only supported participial aspect. |
| 23 | Hätten: subjunctive auxiliary | `hätten` | Konjunktiv-like form mapped to supported mood Sub plus past tense. |
| 24 | Muss: modal auxiliary | `muss` | Modal is represented as AUX with inherent verbType Mod. |
| 25 | Geh: imperative | `geh` | Imperative requires mood Imp and finite verbForm in the schema. |
| 26 | Gebeten: governed-preposition participle | `gebeten` | Passive context in the sentence, but the selected participle is stored without voice because the form itself is the participle of bitten. |
| 27 | Besseren: comparative adjective | `besseren` | Comparative adjective with accusative masculine singular agreement. |
| 28 | Nächsten: superlative adjective | `nächsten` | Superlative-like form in a fixed temporal expression, treated as ADJ inflection. |
| 29 | Linke: short adjective variant | `linke` | Ordinary adjective agreement; included to contrast directional adjective with political/proper-noun readings. |
| 30 | Deutschsprachigen: nominal-looking adjective | `deutschsprachigen` | Looks noun-like in isolation but annotated as an adjective inflection. |
| 31 | Dessen: relative pronoun | `dessen` | Genitive relative pronoun; gender is set to masculine for the antecedent in the sentence. |
| 32 | Deren: feminine relative pronoun | `deren` | Same lemma as dessen, but feminine genitive singular in context. |
| 33 | Ihrem: polite possessive determiner | `Ihrem` | Capitalized polite possessive; encoded as DET with person 2, polite Form, poss Yes. |
| 34 | Seinen: possessive determiner | `seinen` | Possessor gender is represented separately from agreement gender. |
| 35 | Keinem: negative determiner | `keinem` | Negative determiner, not a pronoun, because it modifies Wort. |
| 36 | Manchem: indefinite determiner | `manchem` | Annotated as DET because it modifies Fehler; could be PRON if used substantively. |
| 37 | Wegen: genitive adposition in dative phrase | `wegen` | Questionable colloquial dative complement; lemma still records governedCase Gen as the normative government. |
| 38 | Entlang: postposition | `entlang` | Postpositional ADP rather than ADV, based on its syntactic relation to den Fluss. |
| 39 | Zum: fusion | `zum` | Modeled as `Fusion/General`: the fused form itself is the canonical lemma and citation surface. |
| 40 | Ins: fusion | `ins` | Same `Fusion/General` treatment as zum; the public DTO preserves the fused form intact. |
| 41 | Nicht: negative particle | `nicht` | Negation as PART with polarity Neg rather than ADV. |
| 42 | Zu: infinitive particle | `zu` | Infinitival zu as PART PartType Inf, distinct from prepositional zu. |
| 43 | Bahnhof in idiom | `nur Bahnhof verstehen` | Selected word is a noun-shaped substring inside the idiom nur Bahnhof verstehen; selection coverage is partial. |
| 44 | Hase in idiom | `da liegt der Hase im Pfeffer` | Partial selection inside opaque idiom; selected token is not classified as the lexical noun Hase. |
| 45 | Nagel in idiom | `den Nagel auf den Kopf treffen` | Inflected sentence form points to citation phraseme treffen; selected token is only an internal component. |
| 46 | Morgenstund proverb | `Morgenstund hat Gold im Mund` | Partial selection in a proverb; surface and lemma are the full proverb. |
| 47 | Na ja discourse formula | `na ja` | Discourse formula with role Reaction; punctuation is excluded from normalized surface. |
| 48 | Guten Tag discourse formula | `Guten Tag` | Greeting formula rather than compositional adjective+noun phrase. |
| 49 | Tut mir leid discourse formula | `tut mir leid` | Apology formula stored as phraseme, not a literal finite verb selection. |
| 50 | Un- prefix | `un-` | Bound prefix represented with canonical hyphenated lemma un-, but selected spelling excludes the hyphen. |
| 51 | Ge-...-t circumfix | `ge-...-t` | Circumfix modeled as one morpheme even though the selected spelling is only the first visible segment. |
| 52 | -chen suffix | `-chen` | Suffix surface includes a leading hyphen; learner selection may omit it. |
| 53 | Filosofie typo | `Filosofie` | Typo orthographic status with noncanonical selected spelling pointing to canonical lemma Philosophie. |
