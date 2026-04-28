# New Edge Cases

This note tracks the valuable German follow-up cases that are still not properly covered by the current participle and verbal-form probe set.

## Same-Lemma Contrast Sets

We have several good local examples, but we still need tighter contrast sets where the same lexical family appears across multiple categories.

- `Die [geschlossene] Tür blieb den ganzen Abend zu.` -> likely `ADJ`
- `Die Tür ist [geschlossen].` -> current override `ADJ`
- `Der Laden wurde [geschlossen].` -> `VERB`

Why this matters:

- it tests whether the rule is genuinely stable across uses
- it forces us to separate lexicalized-adjective overrides from default participial `VERB`

## Participles With Verbal Dependents

We still need attributive participles that keep clear verbal-looking internal structure.

- `Die [mit Bleistift geschriebene] Notiz lag noch auf dem Tisch.`
- `Der [von allen bewunderte] Lehrer ging in den Ruhestand.`
- `Die [auf ihn abgestimmte] Lösung half sofort.`

Why this matters:

- the form should probably still classify as `ADJ`
- but these cases test whether classifier agents panic and revert to `VERB` because of the overt dependents

## Separable-Verb Participles Beyond `einzeichnen`

We covered `eingezeichnet` and `eingezeichneten`, but only for one separable-verb family.

- `Der [aufgeschriebene] Name stand noch auf dem Zettel.`
- `Der Name ist [aufgeschrieben].`
- `Die [mitgebrachten] Unterlagen lagen schon im Büro.`
- `Er hat alles [mitgebracht].`

Why this matters:

- it tests whether `hasSepPrefix` stays conceptually stable across `ADJ` and `VERB` outcomes
- it reduces the risk that the current rule only works for one memorized example

## Passive `werden + P2`

We covered auxiliary `gewesen`, but not the most canonical German passive shape.

- `Der Brief wurde [geschrieben].`
- `Die Tür wurde [geschlossen].`
- `Die Kartoffeln wurden [gekocht].`

Why this matters:

- it sharpens the difference between passive verbal participles and lexicalized predicative adjectives
- it gives a cleaner test than only using `sein + P2`

## `zu`-Infinitives As Verbal Forms

We covered nominalized infinitives, but not ordinary infinitives that stay verbal.

- `Er versucht zu [schlafen].`
- `Das ist schwer zu [erklären].`
- `Sie versprach, es bald zu [beenden].`

Why this matters:

- it checks that nonfinite verbal forms are not accidentally absorbed into noun-like or adjective-like buckets
- it gives us a second nonfinite family besides participles

## `P1` Noun Vs `P1` Adjective

We covered `Reisende` as `NOUN`, but we do not yet have a direct contrast with the corresponding attributive use.

- `Der [Reisende] wartete draußen.` -> `NOUN`
- `Der [reisende] Händler wartete draußen.` -> `ADJ`

Why this matters:

- same family, different category
- very efficient test of whether the classifier is reading syntax rather than just memorizing the string

## Nominalized Infinitive Vs Ordinary Verb

We already have nominalized infinitives, but not a direct control pair from the same lemma.

- `[Schwimmen] ist gesund.` -> `NOUN`
- `Wir wollen [schwimmen].` -> `VERB`
- `Das [Rennen] hat Spaß gemacht.` -> `NOUN`
- `Die Kinder [rennen] nach Hause.` -> `VERB`

Why this matters:

- it isolates nominalization as the decisive factor
- it helps catch classifiers that lean too hard on capitalization or surface familiarity alone

## Lexicalization Override Pairs

We already have good override examples, but we still need sharper pairings against non-overrides in similar slots.

- `Sie ist [verheiratet].` -> override `ADJ`
- `Der Brief ist [geschrieben].` -> default `VERB`
- `Die Aufgabe bleibt [ungelöst].` -> override `ADJ`
- `Die Kartoffeln sind [gekocht].` -> default `VERB`

Why this matters:

- this is where the rule is most likely to drift into intuition instead of policy
- paired examples make the override boundary easier to explain and audit

## Syncretic Attributive Participles

We already have some easy attributive forms, but we do not yet stress-test cases where inflection is less transparent.

- `Mit dem [geschriebenen] Wort tat er sich leichter als mit dem freien Vortrag.`
- `In der [geschlossenen] Kiste lagen noch die alten Briefe.`
- `Die [eingeladenen] Gäste warteten bereits im Saal.`

Why this matters:

- it tests how willing we are to use syntax to recover inflectional features
- it overlaps with the broader `Citation` vs `Inflection` question in German
