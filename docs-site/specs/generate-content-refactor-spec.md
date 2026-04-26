# Generate Content Refactor Spec

## Status

Draft.

## Purpose

The current docs pipeline still centers authored Markdown under `src/to-generate/docs`.
That no longer matches the desired model.

We now want a hard split between:

- authored generator inputs
- generated Astro-facing outputs

The generator should own the full Astro-facing docs surface under `docs-site/src/generated/**`.
Nothing under `docs-site/src/to-generate/**` or `docs-site/src/hand-written/**` should be read by Astro directly.

## Core Decision

There are now three distinct content layers:

1. `docs-site/src/to-generate/**`

   Typed source modules that may import each other and may be normalized by the generator before rendering.

2. `docs-site/src/hand-written/**`

   Hand-authored Markdown pages that the generator copies into generated docs without semantic rewriting.

3. `docs-site/src/generated/**`

   Final generated content consumed by Astro.

This means:

- `src/to-generate` is input-only
- `src/hand-written` is input-only
- `src/generated` is output-only

## Goals

- keep all Astro-facing docs fully generated
- support TS-authored rule pages and future TS-authored docs
- keep hand-written Markdown pages as stable raw inputs
- make the input/output boundary obvious from paths alone
- preserve a route-relative directory structure across source and generated docs
- keep navigation and collection loading driven only by generated docs

## Non-Goals

- redesign the Astro UI
- redesign attestation output format
- remove generated public Markdown sidecars
- define every future TS doc kind in this spec

## Desired Directory Layout

```text
docs-site/
  src/
    to-generate/
      attestations/
        {lang}/...
      docs/
        **/*.ts

    classification-logbook/
      {lang}/...

    hand-written/
      **/*.md

    generated/
      docs/
        **/*.md
      entities/
        **/*.md
```

### Ownership By Directory

`src/to-generate/attestations/**`

- typed attestation source modules
- generator input only
- does not contain classification-logbook materials

`src/to-generate/docs/**`

- typed doc source modules
- generator input only
- intended home for rule pages and other generated doc entrypoints

`src/hand-written/**`

- hand-written Markdown pages
- copied into generated docs
- never read directly by Astro

`src/generated/docs/**`

- final docs collection input for Astro
- generated from both TS sources and hand-written Markdown

`src/generated/entities/**`

- final attestation/entity collection input for Astro

`src/classification-logbook/{lang}/**`

- language-scoped classification review materials
- generator input only
- home for generated inventory CSVs plus shared reviewer notes and summaries

## Invariants

- Astro collections load only from `src/generated/docs` and `src/generated/entities`.
- No source page under `src/to-generate/docs` may be Markdown.
- No source page under `src/hand-written` may be TypeScript.
- No classification-logbook material lives under `src/to-generate/attestations`.
- The final route tree for docs is determined only by the generated files under `src/generated/docs`.
- Hand-written and TS-generated docs must not silently claim the same final route.
- The generator may normalize TS source filenames before rendering them.

## Why Two Input Roots Exist

The two input roots have different jobs.

`src/to-generate` is for structured sources whose content is authoritative as data.
Those files may:

- export typed objects
- import helper modules
- reference shared attestation examples
- be renamed automatically to match canonical slugs

`src/hand-written` is for pages whose Markdown is already the authored artifact.
Those files should be copied through as-is, with only normal generated frontmatter/output handling where required by the pipeline.

This keeps raw Markdown out of the typed source tree while avoiding pressure to convert every existing prose page into TS immediately.

`src/classification-logbook` exists for a third reason:

- those files are generator-owned workflow materials
- they are tied to attestation inventories by language
- they are not attestation source entries themselves

Moving them out of `src/to-generate/attestations` makes the attestation source tree more streamlined and keeps review artifacts separate from typed lexical source modules.

## Docs Generation Workflow

The docs pipeline should become an explicit multi-phase workflow.

### Phase 1: Normalize TS Doc Sources

The generator scans `src/to-generate/docs/**/*.ts`.

For each entrypoint module, it:

- loads the exported doc source object
- computes the canonical source path from metadata
- renames the file when the current path drifts from the canonical path
- fails on filename collisions

This mirrors the existing attestation selection normalization pattern.

### Phase 2: Generate Typed Docs

The generator renders TS doc source modules from `src/to-generate/docs/**` into Markdown under `src/generated/docs/**`.

This phase owns:

- typed page validation
- metadata extraction
- Markdown rendering
- generated frontmatter serialization

### Phase 3: Copy Hand-Written Docs

The generator copies Markdown files from `src/hand-written/**` into `src/generated/docs/**`, preserving their relative route paths.

This phase happens after TS doc generation.

That ordering is operational, not semantic.
Hand-written files do not get to silently override generated files.
If a copied hand-written page and a TS-generated page target the same generated path, the generator must fail.

### Phase 4: Build Nav And Public Markdown

After all docs exist under `src/generated/docs/**`, the generator:

- builds nav files from generated docs only
- emits public Markdown sidecars from generated docs only

## Route Mapping Rules

Hand-written docs and TS-generated docs both map to final routes by relative path.

Examples:

```text
src/hand-written/general/model.md
-> src/generated/docs/general/model.md

src/to-generate/docs/lang/de/rules/what-to-do-with-numerals.ts
-> src/generated/docs/lang/de/rules/what-to-do-with-numerals.md
```

The path mapping rule should be deterministic and shared.

## Classification Logbook Location

Classification logbook materials should move from:

```text
src/to-generate/attestations/{lang}/classification-logbook/**
```

to:

```text
src/classification-logbook/{lang}/**
```

This applies to:

- `reviewer-notes.md`
- `summary.md`
- `{lang}-attested-selections.csv`
- `{lang}-attested-selection-descriptors.csv`
- any future language-scoped review artifacts

The purpose of this move is structural clarity:

- `src/to-generate/attestations` stays focused on typed attestation source entries
- `src/classification-logbook` owns review and inventory materials by language

## Classification Logbook Workflow

The attestation generator should keep writing classification logbook artifacts, but it should write them under:

```text
src/classification-logbook/{lang}/
```

That includes:

- ensuring per-language logbook directories exist
- migrating legacy reviewer notes and summaries if needed
- writing generated inventory CSVs into the new root

The refactor should preserve current generation behavior while changing only the source location contract.

## Typed Doc Source Shape

This spec does not finalize every TS doc kind, but it does assume a common page-level metadata contract.

At minimum:

```ts
type DocPageMeta = {
  title: string;
  slug?: string;
  description?: string;
  order?: number;
  routeId?: string;
};
```

`title` is explicit authored metadata.
It is not inferred from the filename.

`slug` is optional.
If present, it participates in canonical filename normalization.
If absent, the generator derives the filename slug from `title`.

`description` and `order` remain authored page metadata, not Astro-only details.
They are used by the generated frontmatter and by generated nav ordering.

## Rule Documents

Rule pages are the first concrete TS doc kind this refactor should support.

The exact rendering shape may still evolve, but the direction is:

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

type RuleDocument = {
  meta: DocPageMeta;
  blocks: readonly {
    heading?: string;
    body?: string;
    render?: AttestedSelectionRendererRequest;
    examples: readonly RuleExample[];
  }[];
};
```

The important constraint is not the exact field names.
The important constraint is that examples can reference typed attestation sources directly, so rule prose and examples stop drifting apart.

The page model should support both:

- a block-level default renderer for all examples in that block
- an example-level override for exceptions

This is needed because some rules want a full `AttestedSelection` rendering, while others want only selected properties.

## AttestedSelection Renderer Registry

`AttestedSelection` renderers should be registry-driven.
Rule documents should only request a renderer by id plus small declarative options.
They should not provide ad hoc render functions.

The generator owns the actual renderer registry.

At minimum, the first implementation should support:

- `selection-csv`
- `selection-fields`

`selection-csv`

- renders the full selection as the existing CSV-like encoded row or an equivalent canonical full-record view
- useful when a rule wants the entire object payload visible

`selection-fields`

- renders only selected properties from the attested selection
- useful when a rule only wants a small focused comparison such as `lemmaSubKind`, `canonicalLemma`, or `surface.normalizedFullSurface`

The exact text format can change during implementation.
The important part is the registry split:

- content asks for renderer ids
- the generator provides the renderer implementations

## Single Generator Config For Renderers

The docs generator should expose one config surface for typed doc rendering.

That config should own:

- the registry of available `AttestedSelection` renderers
- the default renderer id for rule examples when nothing is specified
- any shared formatting defaults used by those renderers

A rough shape:

```ts
type AttestedSelectionRenderer = {
  render: (
    selection: AttestedSelection,
    options: Record<string, unknown> | undefined,
  ) => string;
};

type TypedDocsGenerationConfig = {
  defaultAttestedSelectionRenderer: AttestedSelectionRendererRequest;
  attestedSelectionRenderers: Record<string, AttestedSelectionRenderer>;
};
```

This config belongs to the generator side, not inside individual doc pages.

That keeps renderer behavior:

- centralized
- testable
- extendable without changing every document type

## Field Selection Strategy

The first implementation should allow field-picking by stable property paths.

Examples:

- `selection.spelledSelection`
- `selection.surface.normalizedFullSurface`
- `selection.surface.lemma.lemmaSubKind`

The exact path syntax may change, but it must be:

- deterministic
- documented
- validated by the generator

Unknown field paths must fail generation.

## Filename Normalization For TS Docs

TS doc source filenames should be normalized from page metadata.

The canonical basename is derived from:

- `meta.slug`, if present
- otherwise a slugified form of `meta.title`

The generator should:

- compute the canonical source path before rendering
- rename files that drift
- reject collisions

This is intentionally limited to TS doc sources.

Hand-written Markdown files are already the authored artifact and should not be renamed by content introspection.

## Collision Policy

The generator must fail fast on all of these cases:

- two TS doc sources normalize to the same source path
- two TS doc sources target the same generated path
- a TS-generated doc and a hand-written doc target the same generated path
- a hand-written doc path conflicts with another hand-written doc after route normalization rules are applied

There should be no silent overriding between input roots.

## Implications For Current Modules

The current `docs/` generator modules are too frontmatter-centric for the new model.

The refactor should split docs work into distinct concerns:

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
      normalize-typed-doc-sources.ts
      render-rule-document.ts

      renderers/
        attested-selection-renderers.ts
```

The exact filenames may change, but the separation should remain:

- typed doc normalization/loading/rendering
- hand-written doc copying
- shared route and metadata handling
- centralized typed-doc renderer configuration

The attestation side should also stop treating classification logbook materials as nested inside the attestation source tree.

## Required Path Constants

The current shared path model should be updated to include explicit roots for:

- `sourceAttestationsDir`
- `sourceTypedDocsDir`
- `classificationLogbookDir`
- `handWrittenDocsDir`
- `generatedDocsDir`
- `generatedEntitiesDir`
- `publicDir`

`sourceDocsDir` is no longer precise enough and should be replaced.

## Required API Changes

`generateDocs()` should become asynchronous.

Reason:

- typed doc sources need dynamic `import()`
- typed doc normalization may load sources before rendering

The top-level `generateContent()` flow should remain simple:

1. generate attestations
2. generate docs

Within `generateDocs()`, the flow should be:

1. clean old generated docs outputs
2. normalize typed doc sources
3. generate typed docs
4. copy hand-written docs
5. write nav files

## Migration Plan

### Step 1

Move existing authored Markdown docs from:

```text
src/to-generate/docs/**/*.md
```

to:

```text
src/hand-written/**/*.md
```

preserving route-relative paths.

Examples:

```text
src/to-generate/docs/index.md
-> src/hand-written/index.md

src/to-generate/docs/general/model.md
-> src/hand-written/general/model.md
```

### Step 2

Keep TS-authored rule pages under:

```text
src/to-generate/docs/**/*.ts
```

### Step 3

Move classification logbook materials from:

```text
src/to-generate/attestations/{lang}/classification-logbook/**
```

to:

```text
src/classification-logbook/{lang}/**
```

### Step 4

Refactor the docs generator to produce `src/generated/docs/**` from both input roots.

### Step 5

Remove support for Markdown files under `src/to-generate/docs`.

## Compatibility Notes

Astro content collections do not need to change their generated roots.

The existing `src/generated/docs/**` and `src/generated/entities/**` collections remain the app-facing contract.

What changes is only how those generated docs get built.

## Open Questions

1. Whether typed doc sources should export a named `document` object, a default export, or a doc-kind-specific symbol such as `rule`.
2. Whether hand-written Markdown should continue to own raw frontmatter directly, or whether the generator should normalize it into a shared metadata parser on copy.
3. Whether `routeId` should remain an override escape hatch for docs, or whether docs should move fully to path-based routing plus optional `slug`.
4. Whether non-rule TS doc kinds should render through a single Markdown AST-ish model, or through per-kind renderers.

## Recommendation For The First Implementation

The first refactor should stay narrow:

- move existing Markdown docs into `src/hand-written`
- add the dual-root docs pipeline
- support one typed doc kind: `RuleDocument`
- keep Astro collections unchanged
- keep nav generation reading only generated docs

That gives a clean source/output split without forcing a full docs authoring model rewrite in one pass.
