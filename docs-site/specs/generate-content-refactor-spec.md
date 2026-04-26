# Generate Content Refactor Spec

## Status

Draft.

## Purpose

The current content pipeline still treats `src/to-generate/docs` as a mixed home for authored Markdown and generator inputs.
That is the wrong boundary.

This refactor makes the source model explicit:

- `src/to-generate/**` is typed generator input
- `src/hand-written/**` is raw Markdown input
- `src/generated/**` is the only Astro-facing output

The goal is not to change the public docs site shape.
The goal is to make the source tree honest about what is authored, what is generated, and what is allowed to import what.

## Core Decisions

1. Astro reads only from `src/generated/docs` and `src/generated/entities`.
2. `src/to-generate/docs` contains only TypeScript doc entrypoints and their helpers.
3. `src/hand-written` contains only Markdown docs.
4. `src/classification-logbook/{lang}` owns reviewer notes, summaries, and generated inventory CSVs.
5. Typed doc source filenames may be normalized by the generator.
6. Docs routes are path-based. The first implementation does not support a `routeId` override for docs.
7. Typed doc entrypoints use the `*.doc.ts` suffix and `export default`.
8. The first implementation does not support typed `index` pages.

## Target Directory Layout

```text
docs-site/
  src/
    to-generate/
      attestations/
        {lang}/...
      docs/
        **/*.doc.ts
        **/*.ts

    hand-written/
      **/*.md

    classification-logbook/
      {lang}/...

    generated/
      docs/
        **/*.md
      entities/
        **/*.md
```

## Directory Ownership

`src/to-generate/attestations/**`

- typed attestation source modules
- generator input only
- no classification-logbook materials

`src/to-generate/docs/**`

- typed doc source modules
- generator input only
- entrypoints for generated docs such as rules
- entrypoints are `*.doc.ts`
- non-entrypoint helpers must not use the `*.doc.ts` suffix

`src/hand-written/**`

- hand-authored Markdown docs
- generator input only

`src/classification-logbook/{lang}/**`

- language-scoped review materials
- generator input only
- home for:
  - `reviewer-notes.md`
  - `summary.md`
  - `{lang}-attested-selections.csv`
  - `{lang}-attested-selection-descriptors.csv`

`src/generated/docs/**`

- final docs collection input for Astro

`src/generated/entities/**`

- final attestation/entity collection input for Astro

## Invariants

- No Markdown lives under `src/to-generate/docs`.
- No TypeScript docs live under `src/hand-written`.
- No classification-logbook material lives under `src/to-generate/attestations`.
- `src/generated/**` is output-only.
- Hand-written docs and typed docs may not target the same generated route.
- Typed doc source filenames may drift temporarily, but generation normalizes them before rendering.

## Why This Split Exists

`src/to-generate` is for structured inputs whose source of truth is a typed object.
Those files may import each other and may be renamed by the generator to keep path and metadata aligned.

`src/hand-written` is for pages whose source of truth is already Markdown prose.
Those files are copied through to generated docs rather than interpreted as typed content.

`src/classification-logbook` is separate because those files are workflow artifacts tied to attestation review, not attestation entries.

## Docs Routing

Docs routing is path-based.

Examples:

```text
src/hand-written/general/model.md
-> src/generated/docs/general/model.md
-> /general/model/

src/to-generate/docs/lang/de/rules/what-to-do-with-numerals.doc.ts
-> src/generated/docs/lang/de/rules/what-to-do-with-numerals.md
-> /lang/de/rules/what-to-do-with-numerals/
```

For typed docs, the relative directory comes from the source path.
The basename comes from the canonical slug.

Route collision checks use normalized route ids, not raw file paths.

Examples of equivalent routes:

```text
src/hand-written/foo.md
src/hand-written/foo/index.md
```

Both normalize to `/foo/`, so that combination is invalid.

The first implementation does not support typed `index` pages.
Section index pages remain hand-written Markdown.

## Typed Docs Metadata

All typed doc entrypoints share one page metadata contract:

```ts
type DocPageMeta = {
  title: string;
  slug?: string;
  description?: string;
  order?: number;
};
```

Rules:

- `title` is required and explicit
- `slug` is optional
- if `slug` is absent, the generator derives it from `title`
- `description` and `order` are authored page metadata
- docs do not use a `routeId` override

## Typed Doc Entrypoint Contract

Typed doc discovery is explicit.

Entrypoints:

- must match `**/*.doc.ts`
- must default-export one typed doc object
- must live under `src/to-generate/docs`

Helpers:

- may live anywhere under `src/to-generate/docs`
- must not match `**/*.doc.ts`
- are never directly loaded, renamed, or routed as pages

The first implementation should use:

```ts
export default document;
```

for typed doc entrypoints.

This keeps discovery, normalization, and routing policy trivial:

- load only `*.doc.ts`
- rename only `*.doc.ts`
- route only `*.doc.ts`

## Filename Normalization

Typed doc source filenames are normalized from metadata.

Canonical basename:

- `meta.slug`, if present
- otherwise `slugify(meta.title)`

The generator must:

- load each typed doc entrypoint
- compute its canonical path
- rename the file if it drifted
- fail on collisions

This applies only to typed doc entrypoints.
Hand-written Markdown files are not renamed by content introspection.

## Docs Generation Workflow

`generateDocs()` becomes asynchronous and runs in this order:

1. remove old generated docs outputs
2. normalize typed doc entrypoints under `src/to-generate/docs`
3. discover typed doc outputs and hand-written outputs
4. normalize their route ids
5. fail on any route collision before writing generated docs
6. generate typed docs into `src/generated/docs`
7. copy hand-written Markdown from `src/hand-written` into `src/generated/docs`
8. build nav files from generated docs
9. emit public Markdown sidecars from generated docs

The hand-written copy phase is not an override phase.
If a hand-written page and a typed page target the same output path, generation fails.

## Hand-Written Docs

Hand-written docs stay as Markdown with frontmatter.

The generator should:

- parse their existing frontmatter
- preserve `title`, `description`, and `order`
- fail if `routeId` is present
- copy the page body into `src/generated/docs/**`

The first implementation does not attempt to reinterpret hand-written docs as typed documents.

## Classification Logbook

Classification logbook materials move from:

```text
src/to-generate/attestations/{lang}/classification-logbook/**
```

to:

```text
src/classification-logbook/{lang}/**
```

The attestation generator still owns these artifacts.
What changes is only their home in the source tree.

The generator should:

- ensure `src/classification-logbook/{lang}` exists
- write generated inventory CSVs there
- read and preserve reviewer notes and summaries there
- fail if legacy `src/to-generate/attestations/{lang}/classification-logbook/**` content still exists

## First Typed Doc Kind: RuleDocument

The first typed doc kind is `RuleDocument`.

```ts
type AttestedSelectionRendererRequest =
  | {
      renderer: "selection-csv";
    }
  | {
      renderer: "selection-fields";
      fields: readonly string[];
    };

type RuleExample = {
  selection: AttestedSelection;
  render?: AttestedSelectionRendererRequest;
};

type RuleBlock = {
  heading?: string;
  body?: string;
  render?: AttestedSelectionRendererRequest;
  examples: readonly RuleExample[];
};

type RuleDocument = {
  meta: DocPageMeta;
  blocks: readonly RuleBlock[];
};
```

Rules:

- rule examples reference typed `AttestedSelection` sources directly
- a block may define a default example renderer
- an example may override that renderer
- rule documents do not carry arbitrary render functions

The point of this shape is to stop drift between rule prose and attested examples while keeping rendering policy in the generator.

## AttestedSelection Renderer Registry

`AttestedSelection` rendering is registry-driven.

The document requests a renderer by id.
The generator owns the implementation.

Initial renderer ids:

- `selection-csv`
- `selection-fields`

### `selection-csv`

Renders the full selection through one canonical serializer.

The first implementation should reuse the same full-record data shape used by the classification inventory pipeline, rather than inventing a second “full selection” format.

### `selection-fields`

Renders a small selected subset of properties from the `AttestedSelection`.

Field picking uses validated property paths relative to the `AttestedSelection` root, for example:

- `selection.spelledSelection`
- `selection.surface.normalizedFullSurface`
- `selection.surface.lemma.lemmaSubKind`

Unknown field paths must fail generation.

## Single Typed Docs Config

Typed doc rendering should use one generator-side config object.

```ts
type AttestedSelectionRenderer = {
  render: (
    attestedSelection: AttestedSelection,
    request: AttestedSelectionRendererRequest,
  ) => string;
};

type TypedDocsGenerationConfig = {
  defaultAttestedSelectionRenderer: AttestedSelectionRendererRequest;
  attestedSelectionRenderers: Record<string, AttestedSelectionRenderer>;
};
```

This config owns:

- the renderer registry
- the default example renderer
- any shared formatting defaults needed by typed docs

That keeps rendering policy centralized and extendable.

## Module Layout

The refactor should split docs generation by responsibility:

```text
docs-site/scripts/generate-content/
  docs/
    generate-docs.ts
    routes.ts
    metadata.ts

    handwritten/
      copy-hand-written-docs.ts
      load-hand-written-doc.ts

    typed/
      config.ts
      generate-typed-docs.ts
      load-typed-doc-source.ts
      list-typed-doc-entrypoints.ts
      normalize-typed-doc-sources.ts
      render-rule-document.ts

      renderers/
        attested-selection-renderers.ts
```

The attestation side should also stop assuming that classification-logbook files live inside the attestation source tree.

## Path Constants

The shared paths module should expose:

- `sourceAttestationsDir`
- `sourceTypedDocsDir`
- `handWrittenDocsDir`
- `classificationLogbookDir`
- `generatedDocsDir`
- `generatedEntitiesDir`
- `publicDir`

`sourceDocsDir` should be removed because it no longer names a real single-root docs source.

## Top-Level Workflow

The top-level generation order remains:

1. generate attestations
2. generate docs

This refactor does not change that external contract.

## Migration Plan

1. Move authored Markdown docs from `src/to-generate/docs/**/*.md` to `src/hand-written/**/*.md`, preserving relative paths.
2. Move classification-logbook materials from `src/to-generate/attestations/{lang}/classification-logbook/**` to `src/classification-logbook/{lang}/**`.
3. Refactor docs generation to read from both `src/to-generate/docs` and `src/hand-written`, and to write only to `src/generated/docs`.
4. Remove support for Markdown files under `src/to-generate/docs`.
5. Rename typed doc entrypoints to `*.doc.ts` and make them default-export their document object.
6. Add `RuleDocument` as the first supported typed doc kind.

## Non-Goals For This Refactor

- converting all hand-written docs to TS
- changing Astro collection roots
- redesigning the generated docs HTML
- changing attestation entity route shapes
- designing a general typed-doc AST for every future doc kind

## Result

After this refactor:

- the source tree clearly distinguishes typed inputs, raw Markdown inputs, workflow artifacts, and generated outputs
- Astro reads only generated content
- rules can be authored as typed documents that reference real attestation sources
- `AttestedSelection` rendering is centralized and configurable
- `to-generate` becomes smaller and more coherent
