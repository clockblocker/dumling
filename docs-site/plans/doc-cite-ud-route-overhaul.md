# Doc-Cite UD Route Overhaul

Status: draft

Date: 2026-04-27

## Scope

This spec defines the client-facing route overhaul for doc-cite docs.

The target is a UD-shaped public tree:

- universal pages under `/u/...`
- language pages under `/{lang}/...`
- enum-member leaf pages rendered as `.html`, e.g. `/u/pos/VERB.html`

Phase 1 only authors German content.

In phase 1:

- `/de/...` is the authored source of truth
- `/u/...` is a generated mirror of the German tree

This is a docs-site spec only. It does not change attestation routes.

## Why This Needs A Real Overhaul

The current typed-doc pipeline is path-derived and slash-oriented:

- typed docs live under `docs-site/src/to-generate/docs`
- every `*.doc.ts` produces one generated markdown page
- route IDs are derived from `source directory + slug`
- slugs are lowercased and restricted to `^[a-z0-9-]+$`
- navigation assumes HTML pages live at `/${routeId}/`
- public markdown siblings assume `/${routeId}.md`

That model cannot express UD-style routes exactly because:

- leaf names such as `VERB.html` and `Case.html` are case-sensitive and include `.html`
- `/${routeId}/` is wrong for a public leaf like `/de/pos/VERB.html`
- deriving markdown from the HTML path would produce `VERB.html.md`

So this is not just a content reorganization. The docs generator needs explicit route support.

## Goals

We want one client-facing note page for every public enum bucket that matters to doc-cite users:

- entity kind
- surface kind
- lemma kind
- lexeme subkind / POS
- morpheme subkind
- phraseme subkind
- construction subkind
- selection feature
- surface feature
- grammatical feature name

We also want every section to have an overview page that explains the category and links to the concrete leaf pages.

Example:

- `/de/entity.html` explains what entities are, why the distinction matters, and links to `Lemma`, `Surface`, and `Selection`

## Non-Goals

- replacing attestation routes
- retiring the current `/lang/de/...` handbook pages in phase 1
- generating true cross-language universal prose in phase 1
- auto-deriving all prose from type metadata alone

## Public Route Model

### Core rule

Every route family has:

- one section overview page
- one leaf page for each concrete enum member or feature key

### Public families

#### Entity

- index: `/u/entity.html`, `/de/entity.html`
- leaves:
  - `/u/entity/Lemma.html`, `/de/entity/Lemma.html`
  - `/u/entity/Surface.html`, `/de/entity/Surface.html`
  - `/u/entity/Selection.html`, `/de/entity/Selection.html`

#### Surface kind

- index: `/u/surface.html`, `/de/surface.html`
- leaves:
  - `/u/surface/Citation.html`, `/de/surface/Citation.html`
  - `/u/surface/Inflection.html`, `/de/surface/Inflection.html`

#### Lemma kind

- index: `/u/kind.html`, `/de/kind.html`
- leaves:
  - `/u/kind/Lexeme.html`, `/de/kind/Lexeme.html`
  - `/u/kind/Morpheme.html`, `/de/kind/Morpheme.html`
  - `/u/kind/Phraseme.html`, `/de/kind/Phraseme.html`
  - `/u/kind/Construction.html`, `/de/kind/Construction.html`

#### POS

- index: `/u/pos.html`, `/de/pos.html`
- leaf example:
  - `/u/pos/VERB.html`, `/de/pos/VERB.html`

#### Morpheme subkind

- index: `/u/morpheme.html`, `/de/morpheme.html`
- leaf example:
  - `/u/morpheme/Prefix.html`, `/de/morpheme/Prefix.html`

#### Phraseme subkind

- index: `/u/phraseme.html`, `/de/phraseme.html`
- leaf example:
  - `/u/phraseme/Idiom.html`, `/de/phraseme/Idiom.html`

#### Construction subkind

- index: `/u/construction.html`, `/de/construction.html`
- leaf example:
  - `/u/construction/Fusion.html`, `/de/construction/Fusion.html`

#### Selection features

- index: `/u/feature/selection.html`, `/de/feature/selection.html`
- leaves:
  - `/u/feature/selection/coverage.html`, `/de/feature/selection/coverage.html`
  - `/u/feature/selection/orthography.html`, `/de/feature/selection/orthography.html`
  - `/u/feature/selection/spelling.html`, `/de/feature/selection/spelling.html`

#### Surface features

- index: `/u/feature/surface.html`, `/de/feature/surface.html`
- leaves:
  - `/u/feature/surface/historical-status.html`, `/de/feature/surface/historical-status.html`

#### Grammatical features

- index: `/u/feature.html`, `/de/feature.html`
- leaf example:
  - `/u/feature/Case.html`, `/de/feature/Case.html`

## Public Naming Rules

### Leaf casing

Use public leaf names that reflect the underlying model category:

- enum-style names keep their native exported casing:
  - `Lemma.html`
  - `Citation.html`
  - `Lexeme.html`
  - `VERB.html`
  - `Fusion.html`
  - `Case.html`
- bag-local non-enum feature keys use kebab-case:
  - `coverage.html`
  - `orthography.html`
  - `spelling.html`
  - `historical-status.html`

### Index-page names

Section overview pages are flat `.html` leaves at the family root:

- `/de/entity.html`
- `/de/feature.html`
- `/de/feature/selection.html`

Not:

- `/de/entity/index.html`
- `/de/feature/selection/index.html`

## Route Identity Model

The current `routeId` concept is too overloaded. We need to split internal identity from public URL.

### `docId`

`docId` is the internal hierarchical identifier.

Rules:

- extensionless
- stable
- hierarchy-preserving
- used for grouping, collision detection, internal linking, and markdown sibling paths

Examples:

- `de/entity`
- `de/entity/Lemma`
- `de/surface/Citation`
- `de/pos/VERB`
- `de/feature`
- `de/feature/Case`
- `de/feature/selection`
- `de/feature/selection/coverage`
- `u/feature/Case`

### `htmlRoute`

`htmlRoute` is the exact public output path.

Examples:

- `/de/entity.html`
- `/de/entity/Lemma.html`
- `/de/feature/Case.html`
- `/de/feature/selection/coverage.html`
- `/u/pos/VERB.html`

### Markdown sibling rule

Markdown siblings derive from `docId`, not from `htmlRoute`.

Examples:

- `docId: de/entity` -> markdown `/de/entity.md`
- `docId: de/entity/Lemma` -> markdown `/de/entity/Lemma.md`
- `docId: de/feature/Case` -> markdown `/de/feature/Case.md`

This avoids invalid outputs such as `VERB.html.md`.

## Phase-1 Content Policy

### German source of truth

In phase 1, only `de` pages are authored by hand.

### Universal mirror

In phase 1, the `/u/...` tree is a generated copy of the German tree.

That means:

- every `/de/...` page that exists in the doc-cite tree gets a matching `/u/...` page
- `/u/...` pages are not redirects
- `/u/...` pages may carry mirror metadata linking back to the German source page

### What `/u/...` means in phase 1

It does not mean truly universal prose yet.

It means:

- public universal route shape is already established
- content is temporarily German-backed

## Required Overview Pages

Every section family must have a required overview page.

The overview page must:

- explain what the category is
- explain why the distinction matters in Dumling
- explain how the category is used in doc-cite
- link to the concrete child pages

Minimum required overview pages in phase 1:

- `/de/entity.html`
- `/de/surface.html`
- `/de/kind.html`
- `/de/pos.html`
- `/de/morpheme.html`
- `/de/phraseme.html`
- `/de/construction.html`
- `/de/feature.html`
- `/de/feature/selection.html`
- `/de/feature/surface.html`

And the mirrored `/u/...` equivalents.

## Source Authoring Model

All typed doc-cite source files remain `.ts` files under:

- `docs-site/src/to-generate/docs`

Each source file default-exports one object satisfying a shared shape from:

- `docs-site/src/to-generate/docs/document-shapes.ts`

We should stop duplicating page shapes in:

- the typed-doc loader
- ad hoc local `rule.ts` files next to docs

## Page Shape

The current `RuleDocument` shape is too narrow. We need an explicit route-aware page shape.

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
	| "feature"
	| "feature-selection"
	| "feature-surface";

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

### Page-shape requirements

- `doc.docId` is required
- `doc.htmlRoute` is required
- `doc.family` is required
- `doc.scope` is required
- `doc.subject` is required
- `meta.title` is required
- `meta.slug` should not be used for these pages

## Source Tree

Recommended source layout:

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
      adv.doc.ts
      aux.doc.ts
      cconj.doc.ts
      det.doc.ts
      intj.doc.ts
      noun.doc.ts
      num.doc.ts
      part.doc.ts
      pron.doc.ts
      propn.doc.ts
      punct.doc.ts
      sconj.doc.ts
      sym.doc.ts
      verb.doc.ts
      x.doc.ts
    morpheme.doc.ts
    morpheme/
      circumfix.doc.ts
      clitic.doc.ts
      duplifix.doc.ts
      infix.doc.ts
      interfix.doc.ts
      prefix.doc.ts
      root.doc.ts
      suffix.doc.ts
      suffixoid.doc.ts
      tone-marking.doc.ts
      transfix.doc.ts
    phraseme.doc.ts
    phraseme/
      discourse-formula.doc.ts
      aphorism.doc.ts
      proverb.doc.ts
      idiom.doc.ts
    construction.doc.ts
    construction/
      fusion.doc.ts
      paired-frame.doc.ts
    feature.doc.ts
    feature/
      abbr.doc.ts
      adp-type.doc.ts
      aspect.doc.ts
      case.doc.ts
      conj-type.doc.ts
      definite.doc.ts
      degree.doc.ts
      discourse-formula-role.doc.ts
      ext-pos.doc.ts
      foreign.doc.ts
      gender.doc.ts
      gender-psor.doc.ts
      governed-case.doc.ts
      has-gov-prep.doc.ts
      has-sep-prefix.doc.ts
      hyph.doc.ts
      lexically-reflexive.doc.ts
      mood.doc.ts
      number.doc.ts
      number-psor.doc.ts
      num-type.doc.ts
      part-type.doc.ts
      person.doc.ts
      polarity.doc.ts
      polite.doc.ts
      poss.doc.ts
      pron-type.doc.ts
      punct-type.doc.ts
      reflex.doc.ts
      tense.doc.ts
      variant.doc.ts
      verb-form.doc.ts
      verb-type.doc.ts
      voice.doc.ts
      selection.doc.ts
      selection/
        coverage.doc.ts
        orthography.doc.ts
        spelling.doc.ts
      surface.doc.ts
      surface/
        historical-status.doc.ts
  u/
    ... mirrored structure ...
```

### Source naming rule

Keep source filenames lowercase and extensionless in spirit.

The case-sensitive public leaf lives in `htmlRoute`, not in the source filename.

Examples:

- `docs-site/src/to-generate/docs/de/pos/verb.doc.ts` can generate `/de/pos/VERB.html`
- `docs-site/src/to-generate/docs/de/feature/case.doc.ts` can generate `/de/feature/Case.html`

### Overview-page source rule

The overview page source lives at the parent level:

- `docs-site/src/to-generate/docs/de/entity.doc.ts` -> `/de/entity.html`
- `docs-site/src/to-generate/docs/de/feature.doc.ts` -> `/de/feature.html`
- `docs-site/src/to-generate/docs/de/feature/selection.doc.ts` -> `/de/feature/selection.html`

## Phase-1 German Inventory

### Entity kinds

- `Lemma`
- `Surface`
- `Selection`

### Surface kinds

- `Citation`
- `Inflection`

### Lemma kinds

- `Lexeme`
- `Morpheme`
- `Phraseme`
- `Construction`

### POS pages

Phase-1 German POS pages cover the current `Pos` enum:

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

### Morpheme kinds

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

### Phraseme kinds

- `DiscourseFormula`
- `Aphorism`
- `Proverb`
- `Idiom`

### Construction kinds

- `Fusion`
- `PairedFrame`

### Selection features

- `coverage`
- `orthography`
- `spelling`

### Surface features

- `historical-status`

### Grammatical features

Phase-1 German grammatical feature pages should match the feature names actually used by the German pack:

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

## How Grammatical Feature Pages Work

Grammatical feature pages are flat at the route level.

Example:

- `/de/feature/Case.html`

There is not one route for “inherent Case” and another for “inflectional Case”.

Instead, the single feature page explains, for German:

- which lemma subkinds expose the feature
- whether the feature is inherent, inflectional, or both for each relevant subkind
- how the feature is constrained in Dumling
- where Dumling follows UD directly and where it narrows or extends usage

This matches the real model boundary:

- inherent vs inflectional is per language and per lemma subkind
- it is not a public top-level route family

## Generator Changes Required

### Typed-doc loading

Required:

- allow typed docs to declare explicit `docId`
- allow typed docs to declare explicit `htmlRoute`
- stop requiring route derivation from `meta.slug`
- stop filename normalization that depends on slugified title

### Route helpers

Required:

- stop assuming public HTML pages are slash-routes
- do not append `/` to public `.html` routes
- derive markdown output from `docId`, not `htmlRoute`
- group navigation by `docId`, not by raw public URL

### Frontmatter

Generated frontmatter should carry:

- internal doc identity
- public HTML route

If the current field name `routeId` is kept, it should store the internal extensionless identity, not the public `.html` path.

### Collision rules

Collisions must be checked on:

- `docId`
- `htmlRoute`

Both must be globally unique within docs output.

## Acceptance Criteria For Phase 1

Phase 1 is complete when all of the following are true:

1. The generator can emit docs whose public routes end in `.html`.
2. The generator can emit matching markdown siblings without producing `.html.md`.
3. `de` overview pages exist for every required route family.
4. `de` leaf pages exist for every phase-1 enum member and feature key listed above.
5. The `u` tree is generated as a mirror of the `de` tree.
6. Navigation groups pages by family and child pages correctly using internal hierarchy, not path-string hacks.
7. Existing `/lang/de/...` docs still build and remain accessible.

## Implementation Order

1. Add the new shared doc shape to `document-shapes.ts`.
2. Refactor typed-doc loading to accept explicit `docId` and `htmlRoute`.
3. Refactor navigation and markdown output to use `docId`.
4. Implement one overview page pilot:
   `de/entity.html`
5. Implement one enum leaf pilot:
   `de/entity/Lemma.html`
6. Implement one feature-family pilot:
   `de/feature/selection.html`
7. Implement one feature leaf pilot:
   `de/feature/selection/coverage.html`
8. Build the full `de` tree.
9. Generate the mirrored `u` tree.

## Follow-Up Phases

### Phase 2

- cross-link old `/lang/de/...` pages to the new `/de/...` tree
- decide whether old handbook pages stay, redirect, or shrink to overview pages
- derive inventories from source-of-truth enums and registries instead of maintaining manual lists

### Phase 3

- replace German-backed `/u/...` prose with genuinely universal prose where appropriate
- add authored `en` and `he` trees

## Open Decisions

1. Whether frontmatter should keep the name `routeId` for internal identity or be renamed to `docId`.
2. Whether `/u/...` mirror pages should visibly disclose that they are temporarily German-backed.
3. Whether some current `/lang/de/...` rules pages should become source material for the new overview pages.
