# Doc-Cite UD Route Overhaul

Status: draft

Date: 2026-04-27

## Goal

Overhaul the client-facing doc-cite routes so they follow the Universal Dependencies route shape:

- universal pages live at `/u/...`
- language pages live at `/{lang}/...`
- enum-backed leaf pages mimic UD-style leaf paths such as `/u/pos/VERB.html` and `/de/pos/VERB.html`

For the first pass, only the German tree is authored. The `/u/` tree is a temporary content copy of the German one.

This pass is spec-first. No doc-cite generation behavior changes are implemented here.

## What The Repo Does Today

The current docs generator is path-based:

- typed docs live under `docs-site/src/to-generate/docs`
- every `*.doc.ts` file becomes one generated markdown page
- typed-doc route IDs are derived from `source directory + slug`
- slugs are lowercased and validated against `^[a-z0-9-]+$`
- typed docs cannot currently declare an explicit `routeId`
- navigation assumes HTML pages live at `/${routeId}/`
- public markdown output assumes the markdown sibling is `/${routeId}.md`

This means the current system cannot express UD-like routes exactly, because:

- `VERB.html` contains uppercase letters and a dot
- `Case.html` contains uppercase letters and a dot
- a route ending in `.html` would currently generate a broken markdown sibling such as `VERB.html.md`
- nav helpers currently append a trailing slash, which would turn `VERB.html` into `VERB.html/`

## Route Target

### Public route families

We want one note page for every:

- entity kind: `Lemma`, `Surface`, `Selection`
- surface kind: `Citation`, `Inflection`
- lemma kind: `Lexeme`, `Morpheme`, `Phraseme`, `Construction`
- lexeme subkind / POS: the concrete `Lexeme` POS inventory
- morpheme subkind: every `MorphemeKind`
- phraseme subkind: every `PhrasemeKind`
- construction subkind: every `ConstructionKind`
- selection feature: every key in `selectionFeatures`
- surface feature: every key in `surfaceFeatures`
- grammatical feature: every feature name used anywhere in `inherentFeatures` or `inflectionalFeatures`

### Public path shape

Recommended public HTML path shape:

- universal entity index: `/u/entity.html`
- language entity index: `/de/entity.html`
- universal entity kind: `/u/entity/Lemma.html`
- language entity kind: `/de/entity/Lemma.html`
- universal surface index: `/u/surface.html`
- language surface index: `/de/surface.html`
- universal surface kind: `/u/surface/Citation.html`
- language surface kind: `/de/surface/Citation.html`
- universal lemma-kind index: `/u/kind.html`
- language lemma-kind index: `/de/kind.html`
- universal lemma kind: `/u/kind/Lexeme.html`
- language lemma kind: `/de/kind/Lexeme.html`
- universal POS index: `/u/pos.html`
- language POS index: `/de/pos.html`
- universal POS: `/u/pos/VERB.html`
- language POS: `/de/pos/VERB.html`
- universal morpheme index: `/u/morpheme.html`
- language morpheme index: `/de/morpheme.html`
- universal morpheme subkind: `/u/morpheme/Prefix.html`
- language morpheme subkind: `/de/morpheme/Prefix.html`
- universal phraseme index: `/u/phraseme.html`
- language phraseme index: `/de/phraseme.html`
- universal phraseme subkind: `/u/phraseme/Idiom.html`
- language phraseme subkind: `/de/phraseme/Idiom.html`
- universal construction index: `/u/construction.html`
- language construction index: `/de/construction.html`
- universal construction subkind: `/u/construction/Fusion.html`
- language construction subkind: `/de/construction/Fusion.html`
- universal selection-feature index: `/u/feature/selection.html`
- language selection-feature index: `/de/feature/selection.html`
- universal selection feature: `/u/feature/selection/coverage.html`
- language selection feature: `/de/feature/selection/coverage.html`
- universal surface-feature index: `/u/feature/surface.html`
- language surface-feature index: `/de/feature/surface.html`
- universal surface feature: `/u/feature/surface/historical-status.html`
- language surface feature: `/de/feature/surface/historical-status.html`
- universal grammatical-feature index: `/u/feature.html`
- language grammatical-feature index: `/de/feature.html`
- universal grammatical feature: `/u/feature/Case.html`
- language grammatical feature: `/de/feature/Case.html`

The first-pass language scope is only `de`.

Recommendation:

- enum-valued lexical families that already behave like UD labels keep their native casing in the public leaf, e.g. `VERB.html`, `Fusion.html`, `Lemma.html`
- bag-local feature names that are not already standardized as UD page names use kebab-case public leaves, e.g. `coverage.html`, `historical-status.html`
- grammatical feature pages are flat by feature name; inherent-vs-inflectional usage is documented inside the page per language and per lemma subkind

### Universal-vs-language behavior for phase 1

Phase 1 does not attempt true language-neutral universal pages.

Instead:

- `/de/...` is the authored source of truth
- `/u/...` is generated as a content copy of the matching German page
- both routes are first-class generated pages, not redirects

This matches the requested temporary behavior and keeps the site static.

### Section index rule

Every route family directory should have a corresponding index-style overview page.

Examples:

- `/de/entity.html` explains the entity model, why entity kinds matter, and links to `Lemma`, `Surface`, and `Selection`
- `/de/surface.html` explains the surface layer and links to `Citation` and `Inflection`
- `/de/kind.html` explains the four lemma families and links to `Lexeme`, `Morpheme`, `Phraseme`, and `Construction`
- `/de/pos.html` explains the role of POS pages and links to the concrete POS pages
- `/de/feature.html` explains grammatical features as a cross-cutting system and links to the concrete feature pages
- `/de/feature/selection.html` explains selection-only metadata and links to `coverage`, `orthography`, and `spelling`

These overview pages are required, not optional.

## Key Design Decision

The current `routeId` concept is too overloaded for this overhaul.

Right now it means all of these at once:

- source-derived identity
- navigation hierarchy key
- public HTML path
- base for public markdown sibling output

That coupling works for slash-style routes, but it is the wrong abstraction for UD-style `.html` leaf paths.

### Proposed split

Introduce two route concepts for docs pages:

- `docId`
    - extensionless, hierarchical, stable internal identity
    - examples:
        - `de/entity/Lemma`
        - `de/surface/Citation`
        - `de/pos/VERB`
        - `de/feature/selection/coverage`
        - `u/feature/Case`
    - used for collision detection, parent-child nav grouping, sorting, and internal references
- `htmlRoute`
    - exact public output path
    - examples:
        - `/de/entity/Lemma.html`
        - `/de/feature/selection/coverage.html`
        - `/u/pos/VERB.html`

Markdown sibling output should derive from `docId`, not from `htmlRoute`:

- `docId: de/entity/Lemma`
- HTML: `/de/entity/Lemma.html`
- Markdown: `/de/entity/Lemma.md`

This keeps the public HTML routes UD-shaped without infecting all internal helpers with file-extension semantics.

## Authoring Model

All doc-cite source files should stay as `.ts` files under `docs-site/src/to-generate/docs`.

Each source file should default-export a single object that satisfies a type from:

- `docs-site/src/to-generate/docs/document-shapes.ts`

We should stop duplicating the typed-doc shape in the loader and in per-page local `rule.ts` files.

### Recommended source shape direction

The current `RuleDocument` shape is too narrow for route-driven doc-cite pages. We need a central shape that can carry:

- page metadata
- explicit internal identity
- explicit public HTML route
- page family
- page subject
- body sections
- attested examples
- optional mirror metadata for `/u/` copies

Recommended direction:

```ts
type DocCitePageFamily =
	| "entity"
	| "surface"
	| "kind"
	| "pos"
	| "morpheme"
	| "phraseme"
	| "construction"
	| "feature-selection"
	| "feature-surface"
	| "feature";

type DocCitePageDocument = {
	meta: {
		title: string;
		description?: string;
		order?: number;
	};
	doc: {
		docId: string;
		htmlRoute: `/${string}.html`;
		family: DocCitePageFamily;
		scope: "u" | "de";
		subject: string;
		mirrorsDocId?: string;
	};
	body?: string;
	examples?: readonly AttestedSelection[];
	subsections?: readonly {
		heading?: string;
		body?: string;
		examples?: readonly AttestedSelection[];
	}[];
};
```

This is intentionally close to the current rule-doc authoring model, but it makes routes explicit instead of deriving them from titles.

## Source Tree Recommendation

The source tree should already reflect the public information architecture, even if `docId` and `htmlRoute` become explicit fields.

Recommended first-pass layout:

```text
docs-site/src/to-generate/docs/
  document-shapes.ts
  de/
    entity.doc.ts
    entity/
      lemma.doc.ts
      surface.doc.ts
      selection.doc.ts
    surface.doc.ts
    surface/
      citation.doc.ts
      inflection.doc.ts
    kind.doc.ts
    kind/
      lexeme.doc.ts
      morpheme.doc.ts
      phraseme.doc.ts
      construction.doc.ts
    pos.doc.ts
    pos/
      adj.doc.ts
      adp.doc.ts
      ...
      verb.doc.ts
    morpheme.doc.ts
    morpheme/
      prefix.doc.ts
      suffix.doc.ts
      ...
    phraseme.doc.ts
    phraseme/
      idiom.doc.ts
      proverb.doc.ts
      ...
    construction.doc.ts
    construction/
      fusion.doc.ts
      paired-frame.doc.ts
    feature.doc.ts
    feature/
      case.doc.ts
      person.doc.ts
      verb-form.doc.ts
      ...
      selection.doc.ts
      selection/
        coverage.doc.ts
        orthography.doc.ts
        spelling.doc.ts
      surface.doc.ts
      surface/
        historical-status.doc.ts
  u/
    entity.doc.ts
    entity/
    surface.doc.ts
    surface/
    kind.doc.ts
    kind/
    pos.doc.ts
    pos/
    morpheme.doc.ts
    morpheme/
    phraseme.doc.ts
    phraseme/
    construction.doc.ts
    construction/
    feature.doc.ts
    feature/
      selection.doc.ts
      surface.doc.ts
```

Recommendation: keep source filenames lowercase and extensionless in spirit, and let `htmlRoute` carry the UD-style case-sensitive leaf segment. That avoids tying source filenames to case-sensitive public URLs.

For section overview pages, the source file should sit at the parent level and generate the bare family page:

- `docs-site/src/to-generate/docs/de/entity.doc.ts` -> `/de/entity.html`
- `docs-site/src/to-generate/docs/de/feature.doc.ts` -> `/de/feature.html`
- `docs-site/src/to-generate/docs/de/feature/selection.doc.ts` -> `/de/feature/selection.html`

## Initial German Inventory

### Entity pages

- `Lemma`
- `Surface`
- `Selection`

### Surface-kind pages

- `Citation`
- `Inflection`

### Kind pages

- `Lexeme`
- `Morpheme`
- `Phraseme`
- `Construction`

### POS pages

German `Lexeme` pages should initially cover the current `Pos` enum:

- `ADJ`
- `ADP`
- `ADV`
- `AUX`
- `CCONJ`
- `DET`
- `INTJ`
- `NOUN`
- `NUM`
- `PART`
- `PRON`
- `PROPN`
- `PUNCT`
- `SCONJ`
- `SYM`
- `VERB`
- `X`

### Morpheme-subkind pages

- `Circumfix`
- `Clitic`
- `Duplifix`
- `Infix`
- `Interfix`
- `Prefix`
- `Root`
- `Suffix`
- `Suffixoid`
- `ToneMarking`
- `Transfix`

### Phraseme-subkind pages

- `DiscourseFormula`
- `Aphorism`
- `Proverb`
- `Idiom`

### Construction-subkind pages

- `Fusion`
- `PairedFrame`

### Feature pages

Feature pages should be flat at the route level for grammatical feature names.

That means:

- `feature/selection/*` documents keys that live in `selectionFeatures`
- `feature/surface/*` documents keys that live in `surfaceFeatures`
- `feature/*` documents grammatical feature names that may appear in `inherentFeatures`, `inflectionalFeatures`, or both

The inherent-vs-inflectional split exists, but it exists inside the language pack model at the per-language / per-lemma-subkind level, not as a top-level client-facing route family.

So `Case` should have one route:

- `/de/feature/Case.html`

And that page can then explain:

- which German subkinds expose `Case`
- what de POSes use `Case`
- how Dumling uses it versus the broader UD meaning

### Selection-feature pages

- `coverage`
- `orthography`
- `spelling`

### Surface-feature pages

- `historical-status`

### Grammatical feature pages

The initial German grammatical-feature inventory should match the features actually used by the German pack, not the entire abstract UD catalog.

Based on the current German feature types, the phase-1 flat feature page set should include:

- `Abbr`
- `AdpType`
- `Aspect`
- `Case`
- `ConjType`
- `Definite`
- `Degree`
- `DiscourseFormulaRole`
- `ExtPos`
- `Foreign`
- `Gender`
- `Gender[psor]`
- `GovernedCase`
- `HasGovPrep`
- `HasSepPrefix`
- `Hyph`
- `LexicallyReflexive`
- `Mood`
- `Number`
- `Number[psor]`
- `NumType`
- `PartType`
- `Person`
- `Polarity`
- `Polite`
- `Poss`
- `PronType`
- `PunctType`
- `Reflex`
- `Tense`
- `Variant`
- `VerbForm`
- `VerbType`
- `Voice`

We should treat this inventory as generated-from-types in later implementation, even if phase 1 is authored manually.

## Generator Changes Required

### Typed doc loading

Typed docs need an explicit-route path instead of title-derived slugs.

Required changes:

- allow typed doc objects to declare `docId`
- allow typed doc objects to declare `htmlRoute`
- stop requiring route derivation from `meta.slug`
- stop filename normalization that depends on slugified title

### Route helpers

Navigation and output helpers need to stop assuming that public HTML routes are slash-based:

- `hrefForRouteId()` cannot blindly append `/`
- markdown sibling generation cannot blindly append `.md` to the HTML path
- internal grouping should use `docId`, not `htmlRoute`

### Frontmatter

Generated frontmatter likely needs both fields:

- `routeId` or renamed internal `docId`
- public `htmlRoute`

If we keep the frontmatter name `routeId`, it should store the internal extensionless value, not the `.html` output path.

## Rollout Plan

### Phase 1

- add explicit doc-cite page shape in `document-shapes.ts`
- add explicit doc identity and public HTML route support to typed docs
- author the German `de/` doc-cite tree
- generate a mirrored `/u/` copy from the German tree
- keep existing `/lang/de/...` pages in place

### Phase 2

- cross-link old `/lang/de/...` pages to the new `/de/...` tree
- decide whether old pages remain as overview pages, redirects, or are retired
- derive DTO/kind/POS/feature page inventories from source-of-truth enums and registries instead of hand-maintained lists

### Phase 3

- replace `/u/` copies with genuinely universal pages where the content is truly cross-language
- add language-authored trees for `en` and `he`

## Non-Goals For Phase 1

- full replacement of all current handbook-style docs
- redirects for every existing docs page
- fully automated page generation from type metadata alone
- language-neutral universal prose
- attestation route changes

## Recommended First Implementation Order

1. Refactor typed docs to support explicit `docId` and `htmlRoute`.
2. Move the source shape to `document-shapes.ts` and delete local duplicate rule types.
3. Generate one thin pilot family end-to-end, preferably `de/entity/Lemma.html`.
4. Once that route works, add one routed feature pilot, preferably `de/feature/selection/coverage.html`.
5. After entity and feature pilots work, add the rest of the enum families: `surface`, `kind`, `pos`, `morpheme`, `phraseme`, `construction`.
6. Generate `/u/*` as mirrored copies of the German pages.

## Open Questions

- Should the old `/lang/de/...` rules pages survive as handbook overviews, or do we want them eventually replaced by the new `/de/...` taxonomy tree?
- Do we want `/u/...` copies to share the same title as `/de/...`, or should universal copies be visibly labeled as temporary German-backed pages?
- Should the feature family be exposed as `/feat/` to match UD exactly, even for Dumling-specific features such as `HasGovPrep`, or do we want a separate `/feature/` or `/custom-feat/` namespace for non-UD names?

## Recommendation

Use `/feat/` for all feature pages, including Dumling-only features.

Reason:

- it preserves the UD mental model at the route level
- it keeps the tree shallow and predictable
- the distinction between UD-native and Dumling-specific features belongs in page content, not in the route taxonomy
