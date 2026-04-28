# Rule About Verbs

This note sharpens the German boundary between `VERB`, `AUX`, `ADJ`, and `NOUN` for verb-shaped forms.

The main danger zone is participles. German lets the same surface look verbal, adjectival, or nominal depending on use, so the rule has to key off syntactic function and learner-facing lexical identity rather than historical origin alone.

## Core Rule

- Attributive participles with adjectival agreement classify as `ADJ`.
- Non-attributive participles of lexical verbs classify as `VERB`.
- Participles of auxiliaries classify as `AUX`.
- Substantivized infinitives and participles classify as `NOUN`.
- Fully lexicalized adjectives of participial origin can stay `ADJ`.

## Edge Cases We Want To Test

### Attributive `P1` -> `ADJ`

These modify a noun and behave like adjectives.

- `der [lachende] Junge`
- `die [schlafenden] Kinder`

### Non-attributive `P1` -> `VERB`

These remain verbal rather than adjectival because they do not modify a noun attributively.

- `Sie kam [lachend] herein.`
- `Er saß [schweigend] am Fenster.`

### Attributive `P2` -> `ADJ`

These are participles, but in Dumling they should go to `ADJ` because they are noun-modifying agreement forms.

- `die [eingezeichneten] Seen`
- `der [geschriebene] Brief`
- `die [gekochten] Kartoffeln`

### Predicative Or Bare `P2` Of Lexical Verbs -> `VERB`

These remain verbal, even when the clause has a stative or result-state reading.

- `Auf der Karte sind drei Seen [eingezeichnet].`
- `Der Brief ist schon [geschrieben].`
- `Die Kartoffeln sind bereits [gekocht].`

### `P2` Of Auxiliaries -> `AUX`

The important probe here is `gewesen`.

- `Das wäre schön [gewesen].`
- `Er ist zu spät gekommen [gewesen].`

## Nominalized Verb Forms

### Nominalized Infinitives -> `NOUN`

- `Das [Rennen] hat Spaß gemacht.`
- `[Schwimmen] ist gesund.`
- `Sein ständiges [Meckern] nervt.`

### Nominalized Participles -> `NOUN`

These are useful probes because they still look participial on the surface.

- `der [Reisende]`
- `die [Angestellten]`
- `ein [Verletzter]`

## Lexicalization Override

Some forms are historically participial but synchronically behave like ordinary adjectives for learners. These should be allowed to stay `ADJ`.

- `ein [interessierter] Leser`
- `sie ist [verheiratet]`
- `die Tür ist [geschlossen]`

This is the dangerous class. These forms can tempt a default verbal analysis, so the classifier needs an explicit lexicalization override instead of a blind participle-first rule.

## Practical Summary

Do not use a blanket rule like `P2 -> VERB`.

The actual split we want is:

- attributive participles -> `ADJ`
- non-attributive participles of lexical verbs -> `VERB`
- participles of auxiliaries -> `AUX`
- substantivized verb forms -> `NOUN`
- lexicalized participial adjectives -> `ADJ`
