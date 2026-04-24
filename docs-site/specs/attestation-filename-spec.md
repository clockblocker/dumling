# Selection Fixture Spec

## Status

Draft.

## Purpose

Selection fixtures under `docs-site/src/content/attestations-to-generate/{lang}/selection/{sentence}/*.ts` are generator inputs.

Their file contents are the source of truth.

Their filenames, CSV inventory rows, and classification-logbook materials are derived from those contents.

## Scope

This spec applies only to `Selection` fixtures.

It covers:

- the required file contract for `selection/{sentence}/*.ts`
- how semantic filenames are derived from `sentenceMarkdown`
- where per-language classification logbook files live
- the generated `*-attested-selections.csv` format

It does not apply to non-selection attestations.

Lemma, surface, and other non-selection fixtures keep their current base64url ID-based filenames.

## Required File Contract

Every file under `docs-site/src/content/attestations-to-generate/{lang}/selection/{sentence}/*.ts` must export exactly one `AttestedSelection`.

The intended shape is:

```ts
export const attestation = {
	selection: deSelection053,
	sentenceMarkdown: 'Im Heft stand [Filosofie] statt Philosophie.',
	classifierNotes:
		'Typo orthographic status still points to the canonical noun lemma.',
	lessonsLearned:
		'Typo spelling should still point to the canonical noun lemma.',
} as const satisfies AttestedSelection;
```

Rules:

- `selection` is the classified `Selection` value.
- `sentenceMarkdown` is required.
- `classifierNotes` is optional.
- `lessonsLearned` is optional.
- `order` is not part of `AttestedSelection`.

## `sentenceMarkdown`

`sentenceMarkdown` is the canonical source for:

- the full attested sentence
- the selected substring
- the semantic filename

It must contain exactly one bracketed selection span.

Example:

```text
Im Heft stand [Filosofie] statt Philosophie.
```

For selection fixtures, bracketed selection markup replaces the older bold-based convention.

Supported:

```text
Im Heft stand [Filosofie] statt Philosophie.
```

Not supported:

```text
Im Heft stand **Filosofie** statt Philosophie.
```

The bracketed substring must agree with `attestation.selection`.

## Semantic Filenames

Selection fixture filenames encode the full attested sentence in a normalized, human-readable form, and each file lives inside a sibling sentence directory derived from the same sentence string with the selection brackets removed.

Example:

```text
Im_Heft_stand_Filosofie_statt_Philosophie/Im_Heft_stand_[Filosofie]_statt_Philosophie.ts
```

### Derivation

Start from `attestation.sentenceMarkdown`.

1. Read the full sentence from `sentenceMarkdown`.
2. Treat the single bracketed span as the selected text.
3. Derive the file basename by removing all punctuation except `[` and `]`.
4. Replace spaces with `_`.
5. Collapse repeated `_`.
6. Trim leading and trailing `_`.
7. Append `.ts`.
8. Derive the parent sentence directory from the same basename, but remove `[` and `]`.

### Punctuation Rule

Punctuation is stripped, not encoded.

That means punctuation is removed rather than converted to tokens such as `QUOTE`, `DOT`, or `SLASH`.

Only `[` and `]` survive.

This stripping applies to punctuation that appears in the attested sentence itself, including:

- quotation marks
- apostrophes
- periods
- commas
- colons
- semicolons
- question marks
- exclamation marks
- dashes
- slashes
- ellipses

The exact sentence remains preserved in `sentenceMarkdown`, not in the filename.

### Invariants

- the filename encodes the full sentence, not a shortened label
- exactly one selected span is marked with `[` and `]`
- the bracketed text in the filename matches the selected text in the fixture
- normalization is intentionally lossy with respect to punctuation

### Examples

Sentence:

```text
See you later at the station.
```

Filename:

```text
[See]_you_later_at_the_station.ts
```

Sentence:

```text
The tool is a saw.
```

Filename:

```text
The_tool_is_a_[saw].ts
```

Sentence:

```text
Im Heft stand "Filosofie" statt Philosophie.
```

Filename:

```text
Im_Heft_stand_[Filosofie]_statt_Philosophie.ts
```

## Collision Handling

Selection filename collisions are not disambiguated automatically.

There is no suffixing scheme such as `__2`, `__3`, or hash fallback names.

If two fixtures normalize to the same semantic filename, they are considered too close to coexist as separate generator inputs.

In that case, one of the fixtures should be removed, rewritten, or otherwise deduplicated before generation.

The generator should fail or warn on collisions instead of inventing artificial names.

## Classification Logbook Layout

Each language directory gets a companion classification-logbook directory:

- `docs-site/src/content/attestations-to-generate/de/classification-logbook/`
- `docs-site/src/content/attestations-to-generate/en/classification-logbook/`
- `docs-site/src/content/attestations-to-generate/he/classification-logbook/`

Each directory contains:

- `reviewer-notes.md`
- `summary.md`
- `{lang}-attested-selections.csv`
- `{lang}-attested-selection-descriptors.csv`

Example:

- `docs-site/src/content/attestations-to-generate/de/classification-logbook/reviewer-notes.md`
- `docs-site/src/content/attestations-to-generate/de/classification-logbook/summary.md`
- `docs-site/src/content/attestations-to-generate/de/classification-logbook/de-attested-selections.csv`
- `docs-site/src/content/attestations-to-generate/de/classification-logbook/de-attested-selection-descriptors.csv`

This split is intentional:

- fixture-level `classifierNotes` keep per-selection modeling decisions next to the source data
- `summary.md` is curated
- `reviewer-notes.md` remains separate working context

## Required Logbook Files

### `reviewer-notes.md`

Required structure:

```md
### Reviewer Notes

-

### Open Questions

-
```

### `summary.md`

Required structure:

```md
### Common Mistakes

-

### Locked-In Rules

-
```

Rules:

- all required sections must be present
- if a section is empty, its body is exactly `-`
- `reviewer-notes.md` is a work-in-progress document
- `summary.md` is curated
- legacy `*-selection-decisions.md` material should migrate into per-fixture `classifierNotes`

## Generated `*-attested-selections.csv`

Each `classification-logbook/` directory contains a generated CSV named `{lang}-attested-selections.csv`.

The CSV is generated, not hand-edited.

Header:

```text
sentence_markdown,sectionId,classifierNotes,lessonsLearned
```

Column meanings:

- `sentence_markdown`: emitted exactly from the fixture
- `sectionId`: the long human-readable section ID derived from `selection`
- `classifierNotes`: emitted exactly as written, or empty when omitted
- `lessonsLearned`: emitted exactly as written, or empty when omitted

Rules:

- the CSV does not include `order`
- rows must be emitted in a deterministic order that does not depend on an `order` field

## Generated `*-attested-selection-descriptors.csv`

Each `classification-logbook/` directory contains a generated CSV named `{lang}-attested-selection-descriptors.csv`.

The CSV is generated, not hand-edited.

Header:

```text
sentence_markdown,normalizedFullSurface,orthographicStatus,surfaceKind,lemmaKind,lemmaSubKind
```

Column meanings:

- `sentence_markdown`: emitted exactly from the fixture
- `normalizedFullSurface`: emitted from `selection.surface.normalizedFullSurface`
- `orthographicStatus`: emitted from the selection descriptor
- `surfaceKind`: emitted from the selection descriptor
- `lemmaKind`: emitted from the selection descriptor
- `lemmaSubKind`: emitted from the selection descriptor

Rules:

- the descriptor fields are derived from dumling's public descriptor CSV representation for selections
- the constant `entityKind` and `language` fields are omitted from this per-language logbook CSV
- rows must be emitted in the same deterministic order as `{lang}-attested-selections.csv`

## Cleanup Sequence

1. Define `AttestedSelection`.
2. Migrate selection fixtures from `**selection**` to `[selection]` in `sentenceMarkdown`.
3. Make the generator parse `sentenceMarkdown` as the source of truth.
4. Make the generator rename selection files from `sentenceMarkdown`.
5. Generate `*-attested-selections.csv` from selection fixtures.
6. Move classification logbook materials under `attestations-to-generate/{lang}/classification-logbook/`.
7. Keep per-selection classifier decisions on `AttestedSelection.classifierNotes`, with `reviewer-notes.md` and `summary.md` as shared logbook artifacts.
8. Align references with the new semantic filenames.

## Open Question

- How should the generator validate filename and file-content agreement?
