# Doc-Cite `u` Route Overhaul

## Outcome

Rebuild doc-cite around a UD-like public tree:

- `/u/**` is the universal concept tree
- `/{lang}/**` is a strict subset of that tree
- `/{lang}/...` pages render universal concept content first and language
  content after it
- `/{lang}/...` routes use normal slash URLs, not `.html`
- navigation is generated from the pages that actually exist

This is a clean break. The current doc-cite stubs are disposable. The only
meaningful existing source to preserve is
`docs-site/src/to-generate/docs/lang/de/rules/numerals.doc.ts`, which should be
relocated into `de/classification-instructions/`.

## Fixed Rules

### Public routes

Keep both route families:

- `dumling.xxx/u/**`
- `dumling.xxx/{lang}/**`

This mirrors UD:

- `https://universaldependencies.org/u/pos/`
- `https://universaldependencies.org/en/pos/`

### Source of truth

`u/**` is authoritative.

`lang/{lang}/**` cannot define concepts that do not exist in `u/**`.

### Omission

Omission is page-level only in this overhaul.

Section-level omission is out of scope.

### Composition

For a mirrored language page:

1. render the matching `u/...` page
2. render the matching `lang/{lang}/...` page immediately after it

There is no visible separator by default. The language content continues the
page naturally.

### Examples

Universal pages may define examples.

Language pages do not inherit those examples.

For `/{lang}/...` pages, only language-local examples are rendered.

### Overview pages

Overview pages live in `src/to-generate/docs/**` too.

Their prose remains authored in `*.doc.ts`, but child listings and similar
scope-shaped facts should come from generated tree data instead of manual
inventories.

First pass: do not over-engineer this. Use direct generated data, not a strict
typed helper framework yet.

### Route contract

Remove the special doc-cite `.html` route contract.

Target shape:

- `/u/`
- `/u/feature/`
- `/u/feature/case/`
- `/de/`
- `/de/feature/`
- `/de/feature/case/`

### Language-only exception

There is exactly one language-only exception:

- `lang/{lang}/classification-instructions/**`

This is permanent and narrow. It is not a general escape hatch for arbitrary
language-only sections.

Allowed shape:

- `lang/{lang}/classification-instructions/index.doc.ts`
- `lang/{lang}/classification-instructions/how-to-*.doc.ts`

## Generator Model

### 1. Universal concept pages

Files under `u/**` define:

- concept identity
- universal prose
- universal subsections
- optional universal examples

They generate public `/u/...` pages.

### 2. Language overlay pages

Files under `lang/{lang}/**` define:

- language-local prose
- language-local subsections
- language-local examples

They do not define independent concepts. They only attach to an existing
universal concept at the same relative path.

They generate public `/{lang}/...` pages by composition with the universal
source.

### 3. Classification instructions

Files under `lang/{lang}/classification-instructions/**` are language-only.

They do not require a `u/**` counterpart except for the section index.

`u/classification-instructions/index.doc.ts` provides the universal intro for
the section.

`lang/{lang}/classification-instructions/index.doc.ts` renders:

1. the universal classification-instructions index content
2. a generated list of all local `how-to-*` instruction pages

`lang/{lang}/classification-instructions/how-to-*.doc.ts` are the only allowed
language-only leaves in this section.

## Implementation

### Phase 1. Kill `.html`

Replace the doc-cite route contract with normal slash routes.

That means:

- stop requiring `doc.htmlRoute`
- stop writing doc-cite-specific `.html` frontmatter
- stop relying on the depth-specific `.html.astro` route files
- route doc-cite pages through the normal catch-all docs page flow

### Phase 2. Split source definitions

Replace the current page-centric source-mirrored definition with two explicit
typed-doc source kinds:

- universal concept page
- language overlay page

Keep the first version simple. The language overlay is additive only.

### Phase 3. Compose universal and language pages

Build generation in two passes:

1. discover all universal concept pages
2. discover all language overlay pages
3. validate that each overlay has a universal counterpart
4. emit `/u/...` pages from universal sources
5. emit `/{lang}/...` pages by composing universal content with language
   content, while omitting universal examples
6. emit `classification-instructions/**` as the explicit language-only section

### Phase 4. Generate navigation from emitted pages

Navigation should reflect the emitted tree, not hand-authored assumptions.

That includes:

- `/u/...` nav from the universal tree
- `/{lang}/...` nav from the exposed language subset
- generated child listings for overview pages
- generated child listings for `classification-instructions/index`

First pass: build the generated lists directly in the doc generator. Extract
shared helpers later if repeated code appears.

### Phase 5. Migrate content ownership

Move concept-defining prose out of `lang/{lang}` and into `u/**`.

Keep language-local commentary and examples in `lang/{lang}`.

Move the meaningful German numerals guidance into:

- `lang/de/classification-instructions/how-to-numerals.doc.ts`

Delete the current stub content after the new structure is in place.

## Validation

Generation must fail when:

- a mirrored `lang/{lang}` concept page has no matching `u/**` concept page
- two generated pages resolve to the same public route
- a mirrored language concept page lives outside the allowed subset tree
- a language-only page exists outside `lang/{lang}/classification-instructions/`
- a language-only classification-instructions leaf is not named `how-to-*`

Generation must guarantee:

- `/u/...` is the full universal concept tree
- `/{lang}/...` is a strict subset of `/u/...`
- `/{lang}/...` pages render universal content first and language content
  second
- `/{lang}/...` pages do not render universal examples
- `/{lang}/classification-instructions/` renders the universal section intro
  plus the generated local how-to list

## Code Areas To Change

Main generator work:

- `docs-site/scripts/generate-content/docs/typed/load-typed-doc-source.ts`
- `docs-site/scripts/generate-content/docs/typed/generate-typed-docs.ts`
- `docs-site/scripts/generate-content/docs/typed/render-rule-document.ts`
- `docs-site/scripts/generate-content/docs/routes.ts`
- `docs-site/scripts/generate-content/docs/write-nav.ts`
- `docs-site/src/to-generate/docs/document-shapes.ts`

Routing cleanup:

- `docs-site/src/lib/navigation.ts`
- `docs-site/src/pages/[...slug].astro`
- remove the dedicated `.html.astro` doc-cite routes once no longer needed

Content migration:

- `docs-site/src/to-generate/docs/u/**`
- `docs-site/src/to-generate/docs/lang/{lang}/**`
- `docs-site/src/to-generate/docs/lang/de/rules/numerals.doc.ts`

## First-Pass Stance

Do the simplest version that enforces the structure correctly.

That means:

- additive overlay only
- page-level omission only
- no strict helper framework for overview prose yet
- generated child lists implemented directly where needed
- one explicit language-only exception section and no more
