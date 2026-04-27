### Reviewer Notes

- The file looks structurally sound as CSV, but the review metadata is incomplete. `classificationMistakes` is empty for all 117 rows, and 8 rows still have empty `classifierNotes` (`de-attested-selections.csv:33,37,41,62,64,143,145,147`). The omissions are clustered rather than random, which makes this look like an unfinished pass rather than intentional silence.

- Capitalization-as-variant is not handled consistently. Sentence-initial `Am` and `Die` are marked `Variant` because the attested token is capitalized (`:2`, `:31-32`), but other sentence-initial lowercase lemmas stay `Canonical` even though the surface is equally capitalized by sentence position: `Einst` (`:62`), `Es` (`:87`, `:93`), `Fort` (`:99`), `Geh` (`:105`), `Sieh` (`:139`), `Wegen` (`:182`). This needs a single policy.

- `Pass auf dich auf!` collapses two different token functions into the same analysis. The first `auf` is described as the governed preposition and the second as the detached separable prefix, but both rows encode the same sectionId apart from token position (`:129-132`). If token-level distinctions matter, the current representation is lossy.

- The boundary between `Citation` and `Inflection` looks unstable when the surface is citation-shaped but syntax supplies features. Many nouns are stored as bare citation entries with no case/number (`Band`, `Schloss`, `Kiefer`, `Leiter`, `Mutter`, `Peitsche` at `:11-13`, `:17`, `:23-30`, `:33`, `:115`), while other equally citation-shaped nouns are forced into `Inflection` with syntactically inferred case (`Rand`, `Lot`, `Filosofie` at `:70`, `:78`, `:109`). The current notes suggest both approaches are acceptable, but the file does not make the rule predictable.

- Several rows explicitly rely on uncertain or contestable readings, which is fine, but they probably deserve follow-up rather than being treated as settled. The clearest cases are `ward` as `AUX` rather than `VERB` (`:113-114`), `Verbrannt` as participial verb rather than adjective (`:167-168`), and `lief hinaus` as separable `hinauslaufen` rather than `laufen` + adverb (`:121-124`).

- Idiom-first analysis is applied aggressively, sometimes even where the literal reading is live in context. The strongest example is `mit Haut und Haar` in a scene where a child is literally burning (`:175-180`); the notes acknowledge the literal reading but still force all three tokens into the idiom. The same phrase-first preference appears in `nur Bahnhof verstehen`, `den Nagel auf den Kopf treffen`, `in acht nehmen`, `o wei`, `Morgenstund hat Gold im Mund`, and `ganz und gar` (`:5`, `:7`, `:44`, `:52-53`, `:57-59`, `:118`, `:169-174`). This is a real common pattern, but also a policy choice worth confirming.

- The notes repeatedly expose schema pressure points. Degree/focus items are repeatedly parked under `ADV` because there is no finer subtype (`sehr`, `sogar`, `gar` at `:49`, `:91`, `:158`), `pfui` and `wupp` are treated as plain `INTJ` because response-particle/discourse options are too narrow (`:102`, `:149`), and `auf`/`an` leave `governedCase` unset because the feature is lexical but the attested phrase is token-specific (`:22`, `:66`). The file is consistent about documenting these limitations, but the limitations themselves recur often enough to be a pattern.

- Governance is sometimes lexicalized even when the attested phrase contradicts it. `wegen` is stored with `governedCase=Gen` while the example is explicitly colloquial dative (`[Wegen] dem Regen`, `:182`). That may be the intended lemma policy, but it is a mismatch between lexical metadata and attested local syntax, so it should be an explicit convention rather than an ad hoc note.

- Multiword handling is generally coherent but uneven at the border. `Guten Tag`, `Na ja`, `Tut mir leid`, and `o wei` are promoted to phrasemes/discourse formulas (`:57-59`, `:67`, `:77`, `:101`), while `Sieh einmal` is deliberately not treated as a larger formula (`:139-142`). That may be correct, but it is another place where the file would benefit from a sharper "when do we collapse to a phraseme?" rule.

- Common pattern: there is a strong learner-facing preference for the larger meaning-bearing unit over token-level POS tagging.

- Common pattern: separable verbs are frequently compressed into a single normalized inflected surface (`fuhr um`, `zog an`, `lief hinaus`, `pass auf`).

- Common pattern: the file relies heavily on prose notes to justify edge cases; without the notes, several sectionIds would be hard to defend.

- Common pattern: sense disambiguation for homographs is mostly carried by emoji plus gender/context (`Band`, `Schloss`, `Kiefer`, `Leiter`, `Mutter`).

### Captured Mistakes

- For linking stuff the `meaningInEmojis` is set to the sense of the surrounding phrase.
  Examples:
    - `[Am] nächsten Morgen war alles anders.` -> `🌅`
    - `Er vergaß [seinen] Schlüssel im Büro.` -> `🔑`
    - `[Wegen] dem Regen kamen wir zu spät.` -> `🌧️`
- `spellingRelation` set to `"Variant"` for sentence-initial fusions.
  Examples:
    - `[Am] nächsten Morgen war alles anders.` -> `{ spellingRelation: "Variant" }
- Etymological morphology is forced over learner-facing lexical meaning.
  Examples: - `Am [nächsten] Morgen war alles anders.` -> `{ canonicalLemma: "nah", degree: "Sup", meaningInEmojis: "➡️" }`
- Agents seem to be confused when diven the capitalised words like `[Am] nächsten Morgen war alles anders.`. This leads them to overthink and lean towards { spellingRelation: "Variant" }

### Emerging Rules

- Common fusions (`am`, `ins`, etc.) are always `Standard`, `Full`, `Canonical` when the attested spelling is just ordinary sentence-initial capitalization.
- `meaningInEmojis` must point to the selected item itself, not to the larger surrounding phrase.
- When a form is synchronically lexicalized for learners, classify that lexeme directly instead of forcing a historical or etymological source analysis.
  Example:
    - temporal `nächsten` in `am nächsten Morgen` should be modeled as lexical `nächst`, not as superlative `nah`
- State predicates that predicate over an argument rather than modifying the event stay `ADJ`, even when they can feel adverb-like on the surface. This includes ordinary predicatives with copular `sein` and resultative predicates like `entzwei`.
  Examples:
    - `Am nächsten Morgen war alles [anders].`
    - `Er war am fünften Tage [tot].`
    - `Die schoß das Häschen ganz [entzwei].`
- Participles are stored as inflections of `VERB`, even in stative, passive-like, or adjective-leaning predicative clauses, unless there is a stronger reason to treat the form as a fully lexicalized adjective.
  Examples:
    - `Auf der Karte sind drei Seen [eingezeichnet].`
    - `Sie wurde um Geduld [gebeten].`
    - `[Verbrannt] ist alles ganz und gar, das arme Kind mit Haut und Haar.`
- Finite German modals split by whether they auxiliary-mark an overt infinitive. Use `AUX` when the modal combines with an overt infinitive, and use `VERB` when the modal stands as the clause's main predicate in an elliptical clause with no overt infinitive.
  Examples:
    - `Er [muss] heute arbeiten.` -> `AUX`
    - `Das [muss] heute noch raus.` -> `VERB`
- Short directional forms like `raus`, `rein`, `rüber`, `runter`, `drin`, and `draußen` stay standalone `ADV` entries when there is no overt verb host that licenses a separable-verb analysis. Do not invent a larger verb lemma from clause meaning alone in elliptical clauses.
  Examples:
    - `Das muss heute noch [raus].` -> `ADV` lemma `heraus`
    - `Die Kinder sind schon [drin].` -> `ADV` lemma `drinnen`
- Standalone German intensifiers and scalar-focus items stay `Lexeme/ADV` unless the selected token is clearly part of a fixed learner-facing expression that should be modeled as a larger unit.
  Examples:
    - `Und Minz und Maunz, die schreien [gar] jämmerlich zu zweien.` -> standalone `ADV`
    - `Es brennt das ganze Kind [sogar].` -> standalone `ADV`
    - `Verbrannt ist alles ganz und [gar].` -> partial `Phraseme/Idiom` for `ganz und gar`
- Free prepositions heading ordinary prepositional phrases stay standalone `ADP` entries and are not pulled into the verb. Only lexically governed prepositions or true separable prefixes belong on the verb analysis.
  Examples:
    - `Das rote Band lag [auf] dem Geschenk.` -> standalone `ADP`
    - `Das rote Band [lag] auf dem Geschenk.` -> `VERB` lemma `liegen`, no `hasGovPrep`
- When a conventional idiom is being used literally rather than idiomatically, classify the attested words word-by-word instead of collapsing them into a `Phraseme`.
  Example:
    - `Verbrannt ist alles ganz und gar, das arme Kind mit Haut und [Haar];` -> standalone noun `Haar`, not idiom `mit Haut und Haar`
- If a noun surface is citation-shaped and the local syntax does not decisively resolve the case reading, prefer `Surface/Citation` over a guessed inflectional analysis.
  Example:
    - `Einst ging er an Ufers [Rand] mit der Mappe in der Hand.`
- When a selected token is clearly just an internal component of an idiom, classify the idiom as the learner-facing unit rather than the token's standalone POS.
  Example:
    - `Bei dieser Formel verstehe ich nur [Bahnhof].`
- `Phraseme` is citation-only in the public DTO.
- Citation-only `Construction/PairedFrame` keeps `canonicalLemma` identical to citation `normalizedFullSurface`, using the plain spaced citation form rather than an internal delimiter spelling.
  Example:
    - `um zu`, not `um_zu`
- Only add `gender[psor]` and `number[psor]` when the attested form or clearly recoverable context actually disambiguates possessor features.
- Capitalization is not a Variant.

### Open Questions

- Should sentence-initial capitalization ever trigger `Variant`, or should all purely orthographic sentence-initial capitalization remain `Canonical` unless there is some other noncanonical property?

- Do we want token-role information for split/governed verb constructions so that repeated surface forms like the two `auf` tokens in `Pass auf dich auf!` can be told apart without reading the prose note?

- What is the intended rule for `Citation` vs `Inflection` when morphology is syncretic but syntax still supplies case/number/gender? Right now the file mixes both strategies.

- For idiom/literal overlap cases, what should win: the larger conventional phrase or the locally literal reading? `mit Haut und Haar` is the sharpest test case, but the same question applies to other partial idiom selections too.

- Is lemma-level governance supposed to reflect the dictionary norm even when the attested phrase shows something else, as in `wegen dem Regen`, or should attested syntax be recoverable somewhere in the row?

- If `classificationMistakes` is meant to be used later, what kind of information belongs there? If it is not meant to be used, it is currently dead weight and makes the file look incomplete.
