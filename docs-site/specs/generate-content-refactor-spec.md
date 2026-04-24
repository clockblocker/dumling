# Generate Content Refactor Spec

## Status

Draft.

## Purpose

`docs-site/scripts/generate-content.ts` has grown into a single script that owns too many concerns:

- filesystem traversal
- frontmatter parsing and serialization
- source-doc rendering
- attestation module loading
- attestation validation
- selection filename normalization
- selection logbook migration and CSV generation
- attestation markdown rendering
- navigation generation
- top-level orchestration

This spec defines the target module layout for moving that implementation into `docs-site/scripts/generate-content/**`.

The goal is not to change generator behavior.

The goal is to split the current script into a stable internal module tree with a small public entry surface.

## Scope

This spec covers:

- the new folder structure under `docs-site/scripts/generate-content/`
- the responsibilities of each module group
- which current functions move into which files
- the public exports of `index.ts`
- the compatibility contract for the existing CLI entrypoint

This spec does not cover:

- changes to generated docs output
- changes to attestation schemas or markdown format
- changes to `docs-site/package.json` script names
- new product behavior

## Non-Goals

This refactor is not intended to:

- redesign the content generation pipeline
- rename public npm package exports
- flatten all helpers into barrel files
- expose internal validators or render helpers as public entrypoints

## Current Problems

The current `generate-content.ts` file is hard to work with because:

- unrelated concerns live in one file and must be loaded into working memory together
- selection-specific logic is mixed into generic generation flow
- attestation loading, validation, and rendering are not clearly separated
- helper reuse is implicit rather than enforced by module boundaries
- the current file shape makes future tests harder to add around isolated behavior

## Desired Outcomes

After this refactor:

- the top-level generator entrypoint is thin
- docs generation and attestation generation are separate subsystems
- selection-specific logic is isolated under the attestation subsystem
- shared low-level utilities live in one clearly internal place
- future edits can happen within one subsystem without reopening the whole script

## Target Layout

The target directory layout is:

```text
docs-site/scripts/
  generate-content.ts
  generate-content/
    index.ts
    generate-content.ts

    shared/
      paths.ts
      types.ts
      fs.ts

    docs/
      frontmatter.ts
      routes.ts
      generate-doc-pages.ts
      write-nav.ts

    attestations/
      generate-attestations.ts

      source/
        load-attestation-source.ts
        wrapped-attestation.ts
        direct-attestation.ts

      entity/
        guards.ts
        helpers.ts
        render-ts-value.ts

      selection/
        parse-sentence-markdown.ts
        semantic-source-path.ts
        rename-selection-sources.ts
        logbook.ts

      render/
        render-attestation-body.ts
        generated-frontmatter.ts
        classification-lines.ts
        type-expression.ts

      validate/
        expected-entity-kind-for-path.ts
        validate-attestation-path.ts
        validate-selection-attestation.ts
```

## Entry Point Contract

The existing script path remains the CLI entrypoint:

- `docs-site/scripts/generate-content.ts`

That file becomes a thin compatibility shim.

Its job is:

- import `generateContent` from `./generate-content/index.ts`
- execute `await generateContent()`

It should not keep generator implementation logic.

## Public Module Surface

### Root `index.ts`

`docs-site/scripts/generate-content/index.ts` exposes only workflow-level entrypoints.

It should export:

```ts
export { generateContent } from "./generate-content";
export { generateAttestations } from "./attestations/generate-attestations";
export { generateDocPages } from "./docs/generate-doc-pages";
export { writeNavFiles } from "./docs/write-nav";
```

### What Must Not Be Re-Exported

The root `index.ts` must not re-export:

- runtime guards
- path constants
- frontmatter parsers
- validation helpers
- selection migration helpers
- TS value rendering helpers

Those remain internal implementation details and are imported directly by the modules that need them.

## Module Responsibilities

### `shared/`

`shared/` holds low-level utilities used by both docs and attestation generation.

#### `shared/paths.ts`

Owns path constants currently defined near the top of the script:

- `scriptDir`
- `siteRoot`
- `repoRoot`
- `sourceAttestationsDir`
- `sourceDocsDir`
- `generatedDocsDir`
- `publicDir`
- `readmeExamplesDir`

#### `shared/types.ts`

Owns local script-only types:

- `Frontmatter`
- `SourcePage`
- `AttestationSource`
- `SelectionSentenceParts`
- `SelectionAttestationSource`
- `LogbookFileKind`

#### `shared/fs.ts`

Owns filesystem helpers:

- `listMarkdownFiles`
- `listTypeScriptFiles`
- `ensureCleanDir`
- `removeGeneratedPublicFiles`
- `writeGeneratedMarkdown`
- `ensureTextFile`

`writeGeneratedMarkdown` remains a shared concern because both docs pages and generated attestations use it.

### `docs/`

`docs/` owns rendering of markdown pages from `src/content/docs`.

#### `docs/frontmatter.ts`

Owns:

- `parseFrontmatter`
- `serializeFrontmatter`

#### `docs/routes.ts`

Owns:

- `routeIdForSourcePath`
- `publicMarkdownPathForRouteId`

#### `docs/generate-doc-pages.ts`

Owns the source-doc generation loop that:

- collects README blocks
- reads source markdown files
- parses frontmatter
- renders doc templates
- writes generated markdown
- returns `SourcePage[]`

This file should expose:

- `generateDocPages(): SourcePage[]`

#### `docs/write-nav.ts`

Owns:

- `writeNavFiles`

### `attestations/`

`attestations/` owns generation of pages and derived artifacts from `src/content/attestations-to-generate`.

It is split into five layers:

- `source/`: load modules into in-memory source objects
- `entity/`: runtime guards and entity helpers
- `validate/`: structural and path validation
- `selection/`: selection-only filename and logbook logic
- `render/`: markdown and TS snippet rendering

#### `attestations/source/`

##### `wrapped-attestation.ts`

Owns:

- `getWrappedAttestation`

##### `direct-attestation.ts`

Owns:

- `getDirectAttestation`

##### `load-attestation-source.ts`

Owns:

- `loadAttestationSource`

This file composes the wrapped and direct loaders and returns `AttestationSource`.

#### `attestations/entity/`

##### `guards.ts`

Owns runtime guards:

- `isRecord`
- `isSupportedLanguage`
- `isLemma`
- `isSurface`
- `isSelection`
- `isEntityValue`

##### `helpers.ts`

Owns entity helper functions:

- `languageLabelFor`
- `entityKindFor`
- `surfaceForEntity`
- `lemmaForEntity`
- `camelCaseIdentifier`

##### `render-ts-value.ts`

Owns:

- `renderTsValue`

This stays separate because it is a generic TS code renderer, not an entity classifier.

#### `attestations/validate/`

##### `expected-entity-kind-for-path.ts`

Owns:

- `expectedEntityKindForPath`

##### `validate-attestation-path.ts`

Owns:

- `validateAttestationPath`

##### `validate-selection-attestation.ts`

Owns:

- `isSelectionAttestationSource`
- `validateSelectionAttestation`

This validator depends on selection sentence parsing but remains the boundary where selection-specific source validity is enforced.

#### `attestations/selection/`

##### `parse-sentence-markdown.ts`

Owns:

- `parseSelectionSentenceMarkdown`

##### `semantic-source-path.ts`

Owns:

- `semanticSelectionBasename`
- `selectionSemanticSourcePath`

##### `rename-selection-sources.ts`

Owns:

- `renameSelectionSources`

This module may depend on:

- `listTypeScriptFiles`
- `loadAttestationSource`
- `validateSelectionAttestation`
- `selectionSemanticSourcePath`
- `expectedEntityKindForPath`

##### `logbook.ts`

Owns:

- `csvCell`
- `defaultLogbookText`
- `requiredLogbookSections`
- `validateLogbookFile`
- `migrateLegacySelectionNotes`
- `writeSelectionLogbookCsv`

#### `attestations/render/`

##### `type-expression.ts`

Owns:

- `typeExpressionForEntity`

##### `classification-lines.ts`

Owns:

- `classificationLinesForEntity`

##### `generated-frontmatter.ts`

Owns:

- `generatedFrontmatterForAttestation`

##### `render-attestation-body.ts`

Owns:

- `renderAttestationBody`

This composes:

- entity helpers
- classification rendering
- type-expression rendering
- TS value rendering

#### `attestations/generate-attestations.ts`

Owns the attestation generation workflow that:

- migrates legacy selection notes
- renames selection source files when needed
- loads attestation sources
- validates attestation content and path placement
- renders generated markdown pages
- writes selection logbook CSVs
- returns generated `SourcePage[]`

This file should expose:

- `generateAttestations(): Promise<SourcePage[]>`

## Top-Level Orchestration

`docs-site/scripts/generate-content/generate-content.ts` owns the full generation workflow.

It should:

1. clean generated output directories
2. remove generated public files
3. call `generateAttestations()`
4. call `generateDocPages()`
5. merge both page lists
6. call `writeNavFiles()`

This file should expose:

- `generateContent(): Promise<void>`

It should not contain:

- frontmatter parsing
- attestation loading logic
- selection normalization
- rendering details

## Import Direction Rules

To keep the split coherent, imports should follow these rules:

- `shared/` imports nothing from `docs/` or `attestations/`
- `docs/` may import from `shared/` but not from `attestations/`
- `attestations/` may import from `shared/` but not from `docs/`
- `render/`, `validate/`, `selection/`, `entity/`, and `source/` are internal to `attestations/`
- root `generate-content.ts` may import from both `docs/` and `attestations/`
- root `index.ts` re-exports workflows only

These rules matter more than exact filenames.

They prevent the new folder tree from collapsing back into one coupled module graph.

## Function Mapping From Current Script

The current functions should move as follows:

| Current function | Target module |
| --- | --- |
| `listMarkdownFiles` | `shared/fs.ts` |
| `listTypeScriptFiles` | `shared/fs.ts` |
| `routeIdForSourcePath` | `docs/routes.ts` |
| `publicMarkdownPathForRouteId` | `docs/routes.ts` |
| `parseFrontmatter` | `docs/frontmatter.ts` |
| `serializeFrontmatter` | `docs/frontmatter.ts` |
| `ensureCleanDir` | `shared/fs.ts` |
| `removeGeneratedPublicFiles` | `shared/fs.ts` |
| `writeGeneratedMarkdown` | `shared/fs.ts` |
| `isRecord` | `attestations/entity/guards.ts` |
| `isSupportedLanguage` | `attestations/entity/guards.ts` |
| `languageLabelFor` | `attestations/entity/helpers.ts` |
| `isLemma` | `attestations/entity/guards.ts` |
| `isSurface` | `attestations/entity/guards.ts` |
| `isSelection` | `attestations/entity/guards.ts` |
| `isEntityValue` | `attestations/entity/guards.ts` |
| `entityKindFor` | `attestations/entity/helpers.ts` |
| `surfaceForEntity` | `attestations/entity/helpers.ts` |
| `lemmaForEntity` | `attestations/entity/helpers.ts` |
| `getWrappedAttestation` | `attestations/source/wrapped-attestation.ts` |
| `getDirectAttestation` | `attestations/source/direct-attestation.ts` |
| `loadAttestationSource` | `attestations/source/load-attestation-source.ts` |
| `expectedEntityKindForPath` | `attestations/validate/expected-entity-kind-for-path.ts` |
| `validateAttestationPath` | `attestations/validate/validate-attestation-path.ts` |
| `parseSelectionSentenceMarkdown` | `attestations/selection/parse-sentence-markdown.ts` |
| `semanticSelectionBasename` | `attestations/selection/semantic-source-path.ts` |
| `isSelectionAttestationSource` | `attestations/validate/validate-selection-attestation.ts` |
| `validateSelectionAttestation` | `attestations/validate/validate-selection-attestation.ts` |
| `selectionSemanticSourcePath` | `attestations/selection/semantic-source-path.ts` |
| `renameSelectionSources` | `attestations/selection/rename-selection-sources.ts` |
| `csvCell` | `attestations/selection/logbook.ts` |
| `defaultLogbookText` | `attestations/selection/logbook.ts` |
| `ensureTextFile` | `shared/fs.ts` |
| `requiredLogbookSections` | `attestations/selection/logbook.ts` |
| `validateLogbookFile` | `attestations/selection/logbook.ts` |
| `migrateLegacySelectionNotes` | `attestations/selection/logbook.ts` |
| `writeSelectionLogbookCsv` | `attestations/selection/logbook.ts` |
| `camelCaseIdentifier` | `attestations/entity/helpers.ts` |
| `renderTsValue` | `attestations/entity/render-ts-value.ts` |
| `typeExpressionForEntity` | `attestations/render/type-expression.ts` |
| `classificationLinesForEntity` | `attestations/render/classification-lines.ts` |
| `renderAttestationBody` | `attestations/render/render-attestation-body.ts` |
| `generatedFrontmatterForAttestation` | `attestations/render/generated-frontmatter.ts` |
| `generateAttestationMarkdown` | `attestations/generate-attestations.ts` as `generateAttestations` |
| `writeNavFiles` | `docs/write-nav.ts` |
| `generateContent` | `generate-content.ts` |

## Naming Decisions

The attestation workflow function should be renamed from `generateAttestationMarkdown` to `generateAttestations`.

Reason:

- the workflow does more than markdown generation
- it performs selection-note migration
- it may rename source files
- it writes per-language CSV logbook output

The docs workflow function should be named `generateDocPages`.

Reason:

- it clearly contrasts with `generateAttestations`
- it reflects that the output is a set of generated docs pages, not a generic render helper

## Behavioral Compatibility Requirements

The refactor must preserve:

- generated docs file paths
- generated public markdown file paths
- generated nav output
- attestation page route IDs
- selection filename normalization behavior
- selection collision behavior
- logbook file validation behavior
- logbook CSV output shape
- the `bun run generate:content` command path

Any behavioral change outside those structural moves is out of scope for this refactor and should be proposed separately.

## Suggested Implementation Order

1. Create `generate-content/` and add `shared/paths.ts`, `shared/types.ts`, and `shared/fs.ts`.
2. Move docs-only helpers into `docs/`.
3. Move attestation entity and source helpers into `attestations/entity/` and `attestations/source/`.
4. Move selection parsing, renaming, and logbook logic into `attestations/selection/`.
5. Move validators into `attestations/validate/`.
6. Move rendering helpers into `attestations/render/`.
7. Build `attestations/generate-attestations.ts`.
8. Build `docs/generate-doc-pages.ts`.
9. Build top-level `generate-content.ts`.
10. Replace the old `docs-site/scripts/generate-content.ts` with the thin shim.
11. Run content generation and confirm output is unchanged except for intentional formatting noise, if any.

## Acceptance Criteria

The refactor is complete when:

- `docs-site/scripts/generate-content.ts` no longer contains substantive generator logic
- implementation lives under `docs-site/scripts/generate-content/**`
- `index.ts` exposes only workflow-level functions
- `bun run docs:generate` still works
- generated docs output remains behaviorally equivalent
- the new folder layout reflects actual responsibilities rather than arbitrary file splitting

