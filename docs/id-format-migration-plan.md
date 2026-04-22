# ID Format Migration Plan

## Context

The current runtime API exposes two overlapping serialization surfaces:

```ts
dumling.de.convert.format.toCsv(entity);
dumling.de.convert.format.fromCsv(input);
dumling.de.convert.format.toJson(entity);
dumling.de.convert.format.fromJson(input);
dumling.de.convert.format.toBase64(entity);
dumling.de.convert.format.fromBase64(input);
dumling.de.convert.format.csvToBase64(input);
dumling.de.convert.format.base64ToCsv(input);

dumling.de.id.encode(entity);
dumling.de.id.decode(id);
dumling.de.id.decodeAs(kind, id);
```

These APIs both answer the same caller-level question: turn a Dumling entity into a portable string and back. The split makes `convert.format` and `id` duplicative and obscures which format is intended for stable transport.

## Locked-In Decisions

- Consolidate portable entity encoding under `id`.
- Remove `convert.format` from the public language API.
- Keep `convert` focused on entity projections only:

```ts
dumling.de.convert.lemma.toSurface(lemma);
dumling.de.convert.lemma.toSelection(lemma, options);
dumling.de.convert.surface.toSelection(surface, options);
```

- The public ID API is language namespaced:

```ts
dumling.de.id.encode.asCsv(entity);
dumling.de.id.encode.asBase64Url(entityOrCsv);
dumling.de.id.decode.any(input);
dumling.de.id.decode.asLemma(input);
dumling.de.id.decode.asSurface(input);
```

- `decode.*` accepts plain `string`, not only branded strings. Runtime input usually comes from URLs, databases, files, or clipboards and cannot be trusted by TypeScript brands.
- Encoder outputs should be branded strings.
- Tiny CSV is fully internal. It exists only to shorten base64url payloads.
- Use explicit short tokens for tiny CSV, not ordinal numbers.
- Version tiny CSV with a leading version marker, starting with `v1`.
- The tiny token map is compatibility data. Once shipped, existing `v1` tokens must not be mutated in incompatible ways.
- Base64url should encode tiny CSV, not readable CSV. Use URL-safe characters and omit padding.
- Public names should say `Base64Url`, not `Base64`.
- Readable CSV remains the public human-readable ID representation.
- Readable CSV decoding is permissive for parser-normalized lemma and surface text. The encoder still emits canonical readable CSV.
- Lemma and surface text are canonicalized through the existing language parser before encoding. For current language schemas, this includes NFC lowercasing for `canonicalLemma` and `normalizedFullSurface`.
- Case preservation is not an ID concern. Observed casing belongs to `Selection.spelledSelection`; because selections encode as their linked surface, observed casing is intentionally dropped from IDs.
- Row kind, language code, enum values, feature names, and feature values are case-sensitive. Lemma and surface text fields are canonicalized by the language parser, so caller-provided text casing does not matter there.
- `Selection` does not get its own ID shape. `id.encode.asCsv(selection)` and `id.encode.asBase64Url(selection)` are accepted for caller ergonomics, but they first convert the selection to its linked `Surface`.
- IDs identify normalized linguistic entities, not learner-observed selections. Selection coverage, typo spelling, and spelling relation are intentionally not represented in IDs.
- `Selection` remains a general DTO/entity kind where the broader API needs it, but it is no longer an ID-addressable kind. Remove `decodeAs("Selection")` expectations from ID tests.
- `id.decode.*` returns decode metadata plus the decoded `Lemma` or `Surface`.
- Decoding through a language namespace enforces language match. For example, `dumling.de.id.decode.any("Lemma,en,...")` returns `LanguageMismatch`.
- Existing `dumling:<base64url-json>` IDs are not supported. This is a clean breaking migration.
- Remove the root `inspectId` helper. Decode success includes the inspection metadata callers need: `format`, `language`, and `kind`.
- Feature keys are sorted alphabetically for stable IDs.
- Feature values are sorted alphabetically for stable IDs.
- One-item feature arrays encode the same as scalar feature values after schema parsing and canonicalization.
- Duplicate feature values are invalid for IDs. Encoders and decoders must reject them instead of deduping silently.
- ID feature parsing must reject unknown feature keys before language parser normalization, because some current schema preprocessing strips unknown ontology keys.
- Tiny token coverage must be complete. New enum members, feature names, or feature values must fail tests until explicit `v1` tokens are added.
- `DumlingId` and `DumlingIdInspection` are removed from the public type surface. They are replaced by `DumlingCsv`, `DumlingBase64Url`, and `IdDecodeSuccess`.

## Target Public API

```ts
type DumlingCsv<L extends SupportedLanguage = SupportedLanguage> =
	string & {
		readonly __dumlingCsvBrand: {
			readonly language: L;
		};
	};

type DumlingBase64Url<L extends SupportedLanguage = SupportedLanguage> =
	string & {
		readonly __dumlingBase64UrlBrand: {
			readonly language: L;
		};
	};

type IdDecodeSuccess<L extends SupportedLanguage = SupportedLanguage> = {
	format: "csv" | "base64url";
	language: L;
} & (
	| {
			kind: "Lemma";
			lemma: Lemma<L>;
		}
	| {
			kind: "Surface";
			surface: Surface<L>;
		}
);

type LanguageApi<L extends SupportedLanguage> = {
	id: {
		encode: {
			/**
			 * Encodes Lemma and Surface directly. Selection is accepted for
			 * ergonomics, but it is encoded as its linked Surface.
			 */
			asCsv(entity: Lemma<L> | Surface<L> | Selection<L>): DumlingCsv<L>;
			/**
			 * Accepts trusted entities or branded CSV produced by this API.
			 * Arbitrary strings should go through decode.any(input) first.
			 */
			asBase64Url(
				input: Lemma<L> | Surface<L> | Selection<L> | DumlingCsv<L>,
			): DumlingBase64Url<L>;
		};
		decode: {
			any(
				input: string,
			): ApiResult<IdDecodeSuccess<L>, IdDecodeError>;
			asLemma(
				input: string,
			): ApiResult<
				Extract<IdDecodeSuccess<L>, { kind: "Lemma" }>,
				IdDecodeError
			>;
			asSurface(
				input: string,
			): ApiResult<
				Extract<IdDecodeSuccess<L>, { kind: "Surface" }>,
				IdDecodeError
			>;
		};
	};
};
```

## Encoding Flow

Readable CSV:

```txt
entity -> readable CSV
```

Base64url:

```txt
entity -> parsed/canonicalized entity -> readable CSV -> tiny CSV v1 -> base64url
branded readable CSV -> validate canonical CSV and language -> tiny CSV v1 -> base64url
```

Decode:

```txt
readable CSV -> entity
base64url -> tiny CSV v1 -> readable CSV -> entity
```

## CSV Shape

Readable CSV should be compact but still inspectable. Feature sets should use `key=value` pairs joined by `|`, not embedded JSON.

Entity row shape is suffix-friendly: rows that contain a surface end with the exact lemma row for that surface's lemma. This makes chaining and suffix comparisons straightforward.

Readable CSV is a human-readable ID format. Encoder output is canonical, but decode accepts parser-normalizable lemma and surface text.

Readable CSV decode canonicalizes through the language parser:

```txt
parse input CSV -> canonicalize through language parser -> return decoded entity
```

For example, `Surface,Citation,See,...` is valid readable CSV input when the language parser normalizes the surface to `see`. If the caller re-encodes the decoded entity, `id.encode.asCsv(...)` emits the canonical lowercase form.

Readable CSV uses RFC4180-style field escaping:

- Fields are separated by commas.
- Fields containing comma, quote, CR, or LF are quoted.
- Quotes inside quoted fields are doubled.
- Unicode is allowed.
- `|` and `=` are allowed in ordinary CSV fields.
- Feature keys and feature values must not contain `|`, `=`, or `+`. They currently come from controlled enum/catalog values, so this is enforced by token coverage and parser tests.

Canonical field order is fixed:

| Row kind | Fields |
| --- | --- |
| Lemma | `Lemma`, `language`, `lemmaKind`, `lemmaSubKind`, `canonicalLemma`, `meaningInEmojis`, `inherentFeatures` |
| Citation surface | `Surface`, `Citation`, `normalizedFullSurface`, then the exact lemma row |
| Inflection surface | `Surface`, `Inflection`, `normalizedFullSurface`, `inflectionalFeatures`, then the exact lemma row |

`inherentFeatures` and `inflectionalFeatures` use the same feature-set grammar:

```txt
empty feature set: ""
non-empty feature set: key=value|key=value
multi-value feature value: key=value+value
```

Feature keys sort alphabetically. Values inside a multi-value feature sort alphabetically. Feature pairs sort by feature key.

Readable CSV decode still rejects:

- row kinds other than exact `Lemma` or `Surface`;
- lowercased row kinds such as `lemma`;
- unknown or lowercased enum values such as `lexeme`;
- duplicate feature keys;
- duplicate feature values;
- unsorted feature keys;
- unsorted multi-values;
- non-canonical but semantically equivalent CSV quoting.

The encoder must parse/canonicalize input entities before serialization, so schema-equivalent values produce one stable ID. For example, `{ case: ["Nom"] }` and `{ case: "Nom" }` encode identically after parsing. Duplicate feature values such as `{ case: ["Nom", "Nom"] }` are rejected for ID encoding even if lower-level schemas would otherwise accept them.

ID parsing must validate feature keys before handing a feature object to the language parser. Unknown feature keys are invalid ID payloads and must not be silently stripped by schema preprocessing.

Canonical lemma row example:

```txt
Lemma,de,Lexeme,NOUN,see,🌊,gender=Masc
```

Canonical citation surface row example:

```txt
Surface,Citation,see,Lemma,de,Lexeme,NOUN,see,🌊,gender=Masc
```

Canonical inflection surface row example:

```txt
Surface,Inflection,seen,case=Nom|number=Plur,Lemma,de,Lexeme,NOUN,see,🌊,gender=Masc
```

Example tiny CSV row:

```txt
v1,s,i,seen,ca=n|nu=p,l,de,l,n,see,🌊,g=m
```

Tiny CSV field meanings:

- `v1`: tiny CSV version.
- `s`: `Surface`.
- `i`: `Inflection`.
- `ca=n|nu=p`: feature set with short feature-name and feature-value tokens.
- `l`: `Lemma` or `Lexeme`, depending on field position.
- `n`: `NOUN` or `Nom`, depending on field position.
- `g=m`: `gender=Masc`.

Because tiny tokens can be field-position-dependent, token decoding must happen with schema context, not via one global token namespace.

## Internal File Structure

Proposed files:

```txt
src/operations/shared/id.ts
src/operations/shared/id-codec/
  readable-csv.ts
  tiny-csv.ts
  tiny-tokens.ts
  base64url.ts
```

Responsibilities:

- `id.ts`: builds the public `id` operations and maps parser errors into `IdDecodeError`.
- `id-codec/readable-csv.ts`: serializes `Lemma | Surface` to readable CSV and parses readable CSV back through the language parser.
- `id-codec/tiny-csv.ts`: converts readable CSV to tiny CSV v1 and tiny CSV v1 back to readable CSV.
- `id-codec/tiny-tokens.ts`: owns explicit v1 token maps and inverse maps, including collision checks.
- `id-codec/base64url.ts`: base64url-encodes and decodes tiny CSV payloads.

None of the `id-codec/*` helpers should be exported from package entrypoints.

## Tiny Token Rules

- Prefer one-letter tokens where obvious and unambiguous in context.
- Use two-letter tokens where one-letter tokens would hurt readability or create contextual ambiguity that is not worth it.
- Do not derive tokens from enum order.
- Do not generate tokens automatically from registries.
- Decode token collisions should fail at module initialization in tests/development.
- Token coverage tests must compare all currently accepted public schema feature names and values against the explicit token maps.
- Existing `v1` token meanings never change.
- New `v1` tokens may be added for new schema values.
- Unknown tiny tokens fail as `InvalidPayload`.
- Unknown tiny versions fail as `MalformedId`.
- Feature value tokens are contextual by feature name. For example, `case.Nom` and `number.Plur` may both use short tokens that would collide globally, because decode knows which feature name owns the value.

Initial token examples:

```ts
const entityKindTokens = {
	Lemma: "l",
	Surface: "s",
} as const;

const surfaceKindTokens = {
	Citation: "c",
	Inflection: "i",
} as const;

const lemmaKindTokens = {
	Lexeme: "l",
	Morpheme: "m",
	Phraseme: "p",
} as const;

const lemmaSubKindTokens = {
	NOUN: "n",
	VERB: "v",
	ADJ: "j",
	ADV: "a",
	PROPN: "pn",
} as const;

const featureNameTokens = {
	case: "ca",
	gender: "g",
	number: "nu",
	tense: "te",
	verbForm: "vf",
} as const;

const featureValueTokens = {
	case: {
		Nom: "n",
	},
	gender: {
		Masc: "m",
	},
	number: {
		Plur: "p",
	},
	tense: {
		Past: "pa",
	},
	verbForm: {
		Fin: "f",
	},
} as const;
```

This list is illustrative. The implementation must cover all enum values, lemma kinds, lemma subkinds, surface kinds, feature names, and feature values currently accepted by the public schemas before release.

The feature-set grammar is valid only for catalog-backed atomic feature tokens. If free-text feature values are introduced later, they need a new tiny CSV version or a different feature grammar.

Coverage must be asserted from the actual schema/type registry, including language-specific features and values such as Hebrew features, phraseme and morpheme subkinds, POS values, `gender[psor]`, and `number[psor]`.

Add an explicit runtime schema inventory or token coverage registry as part of this migration. Do not rely on mining brittle Zod internals. The coverage test should compare that registry against the concrete language schema inventory and the explicit token tables.

## Decode Rules

`id.decode.any(input)` uses deterministic format detection:

1. If `input` starts with `Lemma,` or `Surface,`, parse it as readable CSV.
2. Otherwise parse it as base64url-encoded tiny CSV.

Canonical row-kind fields are never quoted. No leading whitespace or BOM is allowed. Inputs starting with `Lemma` or `Surface` but malformed as readable CSV must return a CSV-shaped error and must not fall through to base64url decoding. This keeps errors tied to the format the caller visibly provided.

Detection edge cases:

| Input prefix | Behavior |
| --- | --- |
| `Lemma,` | Parse as readable CSV lemma row |
| `Surface,` | Parse as readable CSV surface row |
| `Lemma` without comma | Treat as malformed readable CSV, not base64url |
| `Surface` without comma | Treat as malformed readable CSV, not base64url |
| `LemmaX` | Treat as malformed readable CSV, not base64url |
| `"Lemma",` | Treat as base64url candidate; quoted row kind is not canonical readable CSV |
| leading space, tab, newline, or BOM before `Lemma,`/`Surface,` | `MalformedId` |
| lowercase `lemma,`/`surface,` | Treat as base64url candidate, which normally returns `MalformedId` |

Language mismatch is explicit. If a namespace-bound decoder receives a structurally valid ID for a different language, return `LanguageMismatch`, for both readable CSV and base64url inputs.

Language error precedence:

| Input | Namespace | Error code |
| --- | --- | --- |
| `Lemma,en,...` | `dumling.de` | `LanguageMismatch` |
| `Lemma,fr,...` | `dumling.de` | `LanguageNotImplemented` |
| base64url payload containing `Lemma,en,...` | `dumling.de` | `LanguageMismatch` |
| base64url payload containing `Lemma,fr,...` | `dumling.de` | `LanguageNotImplemented` |

`id.encode.asBase64Url(csv)` must parse, canonicalize, and validate that branded CSV belongs to the namespace language before converting it to tiny CSV. Brands are compile-time hints, not runtime trust boundaries. Base64url output always encodes canonical tiny CSV, even when the readable CSV input used non-canonical text casing.

There is no direct API for converting arbitrary untrusted readable CSV strings to base64url. Callers must decode first, then re-encode the decoded ID-addressable entity:

```ts
const decoded = dumling.de.id.decode.any(input);
if (decoded.success) {
	const entity =
		decoded.data.kind === "Lemma"
			? decoded.data.lemma
			: decoded.data.surface;
	const id = dumling.de.id.encode.asBase64Url(entity);
}
```

Decode success includes both metadata and the decoded entity:

```ts
{
	success: true,
	data: {
		format: "csv",
		language: "de",
		kind: "Lemma",
		lemma,
	},
}

{
	success: true,
	data: {
		format: "base64url",
		language: "de",
		kind: "Surface",
		surface,
	},
}
```

`id.decode.asLemma(input)` and `id.decode.asSurface(input)` preserve the same metadata shape and narrow only by `kind`. If the decoded kind does not match, return `EntityMismatch`.

ID decode error boundaries:

| Scenario | Error code |
| --- | --- |
| Input is neither readable CSV nor valid base64url | `MalformedId` |
| Base64url decodes to non-tiny-CSV text | `MalformedId` |
| Unknown tiny CSV version | `MalformedId` |
| Recognized `v1` tiny CSV with bad field count or bad row structure | `InvalidPayload` |
| Unknown tiny token in recognized `v1` payload | `InvalidPayload` |
| Readable CSV has wrong field count or bad row structure | `InvalidPayload` |
| Readable CSV has duplicate feature keys or duplicate feature values | `InvalidPayload` |
| Readable CSV contains unknown feature keys before parser normalization | `InvalidPayload` |
| Readable CSV has valid structure but language parser rejects the entity | `InvalidPayload` |
| Unsupported language code | `LanguageNotImplemented` |
| Valid ID for a different namespace language | `LanguageMismatch` |
| `asLemma` receives a surface, or `asSurface` receives a lemma | `EntityMismatch` |

## Compatibility Notes

- Existing `dumling:<base64url-json>` IDs are replaced by the new base64url ID representation.
- No backward compatibility is required for the old `dumling:` format.
- The root `inspectId` helper is removed because `id.decode.any(input)` returns `format`, `language`, and `kind` on success.
- Callers that used `inspectId` for cheap routing must migrate to `id.decode.any(input)` and branch on `success`, `data.language`, `data.kind`, or `error.code`.
- Type exports should remove `DumlingId` and `DumlingIdInspection`, then add `DumlingCsv`, `DumlingBase64Url`, and `IdDecodeSuccess`.

## Migration Checklist

1. Add `DumlingCsv` and `DumlingBase64Url` public types.
2. Update `LanguageApi.id` to the nested `encode` and `decode` shape.
3. Remove `LanguageApi.convert.format`.
4. Move CSV/JSON/base64 logic out of `convert.ts`.
5. Implement readable CSV ID codec with `key=value|key=value` feature formatting.
6. Implement tiny CSV v1 with explicit short-token maps.
7. Route `id.encode.asBase64Url` through readable CSV then tiny CSV.
8. Route `id.decode.any` through readable CSV or base64url detection.
9. Add `id.decode.asLemma` and `id.decode.asSurface` entity-kind guards.
10. Make `id.encode.*` accept `Selection` and encode it as `selection.surface`.
11. Remove legacy `dumling:` decode support.
12. Remove the root `inspectId` export.

TDD-focused checks:

13. Add token coverage tests for every public enum member, feature name, and feature value.
14. Add tests proving selections encode to the same ID as their linked surface.
15. Add tests proving typo spelling, spelling relation, and selection coverage do not affect encoded IDs.
16. Remove `decodeAs("Selection")` expectations from ID tests.
17. Add tests proving malformed readable CSV does not fall through to base64url decoding.
18. Add tests proving language mismatch and language-not-implemented precedence for readable CSV and base64url.
19. Add tests proving readable CSV accepts parser-normalizable lemma/surface text casing.
20. Add tests proving one-item arrays and scalar feature values encode identically after canonicalization.
21. Add tests proving duplicate feature values are rejected for ID encoding and decoding.
22. Add tests proving unknown feature keys are rejected before parser normalization.
23. Add tests proving encoded readable CSV and base64url use parser-normalized lowercase lemma/surface text.
24. Add tests for the decode error taxonomy table.
25. Remove `DumlingId` and `DumlingIdInspection` from public type exports and update package hygiene assertions.
26. Update internal API tests.
27. Update external public ID tests.
28. Update type tests.
29. Update README template and regenerate README.
30. Run `bun test`, `bun run check`, and `bun run check:types`.
