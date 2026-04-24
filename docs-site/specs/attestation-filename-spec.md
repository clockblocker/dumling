# Attestation Filename Spec

## Status

Draft.

## Purpose

Generated attestation input files under `docs-site/src/content/attestations-to-generate/**` are a semantic playground for generation, review, and debugging.

Their filenames should therefore be human-readable and should expose the selected span directly, instead of using opaque encoded IDs.

## Scope

This spec defines how to derive a `.ts` filename from an attested sentence and its selected span.

It applies only to generated `Selection` attestation input files such as:

- `docs-site/src/content/attestations-to-generate/de/selection/*.ts`
- `docs-site/src/content/attestations-to-generate/en/selection/*.ts`
- `docs-site/src/content/attestations-to-generate/he/selection/*.ts`

It does not apply to non-selection attestations.

Lemma, surface, and other attestation kinds should keep their current base64url ID-based filenames.

## Source of Truth

For selection fixtures, the file contents are the source of truth.

Filenames are derived artifacts.

That means the generator should read the exported attestation object, derive the expected semantic filename from its contents, and rename the file if needed.

## Selection File Contract

Every file under `docs-site/src/content/attestations-to-generate/{lang}/selection/*.ts` must export one and only one `AttestedSelection`.

The intended shape is:

```ts
export const attestation = {
	selection: deSelection053,
	sentenceMarkdown: 'Im Heft stand [Filosofie] statt Philosophie.',
	title: 'Filosofie typo',
	lessonsLearned:
		'Typo spelling should still point to the canonical noun lemma.',
} as const satisfies AttestedSelection;
```

The generator should treat that export as the canonical input for:

- the selected span
- the full attested sentence
- the display title
- the optional one-line lesson learned
- the semantic filename

`AttestedSelection` does not carry an `order` field.

Selection fixtures should not use explicit numeric ordering as part of their contract.

## `sentenceMarkdown`

For `AttestedSelection`, `sentenceMarkdown` carries the full attested sentence and marks the selected span inline with `[` and `]`.

Example:

```text
Im Heft stand [Filosofie] statt Philosophie.
```

This gives the generator a single source for:

- recovering the full sentence
- recovering the selected substring
- deriving the normalized semantic filename

`sentenceMarkdown` must contain exactly one bracketed selection span.

The bracketed substring must agree with `attestation.selection`.

Bracketed selection markup replaces the older bold-based selection markup used in existing fixtures.

For selection fixtures, `**selection**` is no longer the canonical or supported way to mark the selected span in `sentenceMarkdown`.

The supported form is:

```text
Im Heft stand [Filosofie] statt Philosophie.
```

Not:

```text
Im Heft stand **Filosofie** statt Philosophie.
```

## Core Rule

The filename encodes the full attested sentence.

The selected span is represented by wrapping the selected text in `[` and `]`.

All punctuation is removed except `[` and `]`.

Spaces are replaced with `_`.

The filename keeps the original script for letters and digits.

The file extension is `.ts`.

## Derivation Algorithm

Start from `attestation.sentenceMarkdown`.

1. Read the full attested sentence from `sentenceMarkdown`.
2. Treat the single bracketed span as the selected text.
4. Remove all punctuation characters except `[` and `]`.
5. Replace each space with `_`.
6. Collapse repeated `_` into a single `_`.
7. Trim leading and trailing `_`.
8. Append `.ts`.

## Punctuation Stripping

Punctuation is stripped, not encoded.

That means punctuation does not get replaced with readable tokens such as `QUOTE`, `DOT`, or `SLASH`.

Only selection brackets survive punctuation stripping:

- `[` stays
- `]` stays

All other punctuation is removed.

This includes punctuation that is present in the attested sentence itself, such as:

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

The exact sentence is preserved in the file contents, not in the filename.

## Invariants

- The filename must encode the full sentence, not a shortened label.
- Exactly one selected span must be marked with `[` and `]`.
- The bracketed text in the filename must match the selected text in the attestation.
- `sentenceMarkdown` is the canonical source for filename derivation.
- Removing `[` and `]`, converting `_` back to spaces, and ignoring stripped punctuation should recover the attested sentence carried by `sentenceMarkdown`.
- Filename normalization is intentionally lossy with respect to punctuation.

## Examples

Sentence:

```text
See you later at the station.
```

Selection:

```text
See
```

Filename:

```text
[See]_you_later_at_the_station.ts
```

Sentence:

```text
The tool is a saw.
```

Selection:

```text
saw
```

Filename:

```text
The_tool_is_a_[saw].ts
```

Sentence:

```text
Im Heft stand "Filosofie" statt Philosophie.
```

Selection:

```text
Filosofie
```

Filename:

```text
Im_Heft_stand_[Filosofie]_statt_Philosophie.ts
```

## Non-Selection Attestations

Non-selection attestations keep base64url ID-based filenames.

That preserves the current opaque-but-stable naming scheme where there is no selected span to expose in the filename.

## Collision Handling

Filename collisions are not disambiguated automatically.

There is no suffixing scheme such as `__2`, `__3`, or hash-based fallback names.

If two distinct selection fixtures normalize to the same filename, they are considered too close to coexist as separate generator inputs.

In practice, that means one of the following should happen:

- one example is removed
- one example is rewritten
- the fixture set is otherwise deduplicated before generation

The generator should fail or warn on collisions rather than generating multiple files with artificial disambiguation.

The rationale is that punctuation-only distinctions are not meaningful enough to justify separate selection playground fixtures once the classification itself is settled.

## Generated CSV

Each language selection directory should have a `classification-logbook/` companion directory:

- `docs-site/src/content/attestations-to-generate/de/classification-logbook/`
- `docs-site/src/content/attestations-to-generate/en/classification-logbook/`
- `docs-site/src/content/attestations-to-generate/he/classification-logbook/`

That directory contains:

- `classifier-notes.md`
- `reviewer-notes.md`
- `summary.md`
- `{lang}-attested-selections.csv`

For example:

- `docs-site/src/content/attestations-to-generate/de/classification-logbook/classifier-notes.md`
- `docs-site/src/content/attestations-to-generate/de/classification-logbook/reviewer-notes.md`
- `docs-site/src/content/attestations-to-generate/de/classification-logbook/summary.md`
- `docs-site/src/content/attestations-to-generate/de/classification-logbook/de-attested-selections.csv`

## Classification Logbook Files

The logbook is intentionally split across multiple files.

This keeps classifier and reviewer context separated and makes curation easier than a single combined document.

### `classifier-notes.md`

Required sections:

```md
### Classifier Notes

-

### Open Questions

-
```

### `reviewer-notes.md`

Required sections:

```md
### Reviewer Notes

-

### Open Questions

-
```

### `summary.md`

Required sections:

```md
### Common Mistakes

-

### Locked-In Rules

-
```

All required sections must be present.

If a section has no content yet, its body is exactly `-`.

Existing selection decision documents should migrate into `### Classifier Notes` first.

`summary.md` is the curated document.

`classifier-notes.md` and `reviewer-notes.md` are work-in-progress documents.

## Generated `*-attested-selections.csv`

Each `classification-logbook/` directory also contains a generated CSV named `{lang}-attested-selections.csv`.

The CSV is generated, not hand-edited.

Its header is:

```text
sentence_markdown,sectionId,lessonsLearned
```

Where:

- `sentence_markdown` is emitted exactly from the `AttestedSelection`
- `sectionId` is the long human-readable section ID derived from `selection`
- `lessonsLearned` is emitted exactly as written, or left empty when omitted

The CSV does not include `order`.

Rows should be emitted in a deterministic order that does not depend on a numeric `order` field.

## Cleanup Sequence

The intended cleanup order is:

1. Define `AttestedSelection`.
2. Migrate selection fixtures from `**selection**` markup to `[selection]` markup in `sentenceMarkdown`.
3. Make the generator parse `sentenceMarkdown` as the source of truth.
4. Make the generator rename selection files from parsed content according to this spec.
5. Generate `*-attested-selections.csv` from selection fixtures.
6. Move classification logbook materials under `attestations-to-generate/{lang}/classification-logbook/`.
7. Split working notes and curated summary into separate files in that directory.
8. Align decision docs and other references with the new semantic filenames.

## Open Questions

- How should the generator validate filename/content agreement?
