import { describe, expect, it } from "bun:test";
import { dumling } from "../../src";
import { schema } from "../../src/schema";
import type { Lemma, Selection } from "../../src/types";

function encodeBase64Url(value: string) {
	return Buffer.from(value, "utf8")
		.toString("base64")
		.replaceAll("+", "-")
		.replaceAll("/", "_")
		.replace(/=+$/u, "");
}

describe("API", () => {
	it("creates, converts, extracts, and describes german entities", () => {
		const lemma = dumling.de.create.lemma({
			language: "he",
			canonicalLemma: "See",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🌊",
		});

		const surface = dumling.de.convert.lemma.toSurface(
			lemma as Lemma<"de", "Lexeme", "NOUN">,
		);
		const selection: Selection<"de"> = dumling.de.convert.surface.toSelection(
			surface,
			{
				spelledSelection: "See",
			},
		);

		expect(lemma.language).toBe("de");
		expect(surface.normalizedFullSurface).toBe("See");
		expect(selection.orthographicStatus).toBe("Standard");
		expect(selection.selectionCoverage).toBe("Full");
		expect(selection.spellingRelation).toBe("Canonical");
		expect(dumling.de.extract.lemma(selection)).toBe(lemma);
		expect(dumling.de.describe.as.lemma(selection)).toEqual({
			language: "de",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
		});
		expect(dumling.de.describe.as.surface(lemma)).toEqual({
			language: "de",
			surfaceKind: "Lemma",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
		});
		expect(dumling.de.describe.as.selection(surface)).toEqual({
			language: "de",
			orthographicStatus: "Standard",
			surfaceKind: "Lemma",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
		});
	});

	it("ignores caller-supplied namespace-implied fields in create operations", () => {
		const lemma = dumling.de.create.lemma({
			language: "he",
			canonicalLemma: "See",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "🌊",
		} as any);

		const lemmaSurface = dumling.de.create.surface.lemma({
			language: "he",
			surfaceKind: "Inflection",
			normalizedFullSurface: "See",
			lemma: {
				...lemma,
				language: "he",
			},
		} as any);

		const typoSelection = dumling.de.create.selection.typo({
			language: "he",
			orthographicStatus: "Standard",
			selectionCoverage: "Full",
			spelledSelection: "Sse",
			spellingRelation: "Canonical",
			surface: {
				...lemmaSurface,
				language: "en",
			},
		} as any);

		expect(lemma.language).toBe("de");
		expect(lemmaSurface.language).toBe(lemmaSurface.lemma.language);
		expect(lemmaSurface.surfaceKind).toBe("Lemma");
		expect(typoSelection.language).toBe(typoSelection.surface.language);
		expect(typoSelection.orthographicStatus).toBe("Typo");
	});

	it("uses the current selection defaults in conversions", () => {
		const lemma = dumling.de.create.lemma({
			canonicalLemma: "See",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "🌊",
		});

		const fromLemma = dumling.de.convert.lemma.toSelection(lemma);
		const fromSurface = dumling.de.convert.surface.toSelection(
			dumling.de.convert.lemma.toSurface(lemma),
		);

		expect(fromLemma.orthographicStatus).toBe("Standard");
		expect(fromLemma.selectionCoverage).toBe("Full");
		expect(fromLemma.spellingRelation).toBe("Canonical");
		expect(fromLemma.spelledSelection).toBe("See");
		expect(fromSurface).toEqual(fromLemma);
	});

	it("parses normalized german DTOs and exposes schema leaves", () => {
		const parsedLemma = dumling.de.parse.lemma({
			language: "de",
			canonicalLemma: "See",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
				unexpected: "x",
			},
			meaningInEmojis: "🌊",
		} as any);

		expect(parsedLemma.success).toBe(true);
		if (!parsedLemma.success) {
			throw new Error(parsedLemma.error.message);
		}
		expect(parsedLemma.data.canonicalLemma).toBe("see");
		expect(parsedLemma.data.inherentFeatures).toEqual({
			gender: "Masc",
		});

		const parsedSelection = dumling.de.parse.selection({
			language: "de",
			orthographicStatus: "Standard",
			selectionCoverage: "Full",
			spelledSelection: "See",
			spellingRelation: "Canonical",
			surface: {
				language: "de",
				normalizedFullSurface: "See",
				surfaceKind: "Lemma",
				lemma: parsedLemma.data,
			},
		});

		expect(parsedSelection.success).toBe(true);
		expect(
			schema.abstract.lemma.lexeme.verb().safeParse({
				language: "xx",
				canonicalLemma: "gehen",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {},
				meaningInEmojis: "🚶",
			}).success,
		).toBe(true);
		expect(
			schema.de.selection.standard.lemma.lexeme.noun().safeParse(
				parsedSelection.success ? parsedSelection.data : undefined,
			).success,
		).toBe(true);
	});

	it("rejects known-but-context-illegal inherent feature keys", () => {
		const result = dumling.de.parse.lemma({
			language: "de",
			canonicalLemma: "See",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				tense: "Past",
			},
			meaningInEmojis: "🌊",
		} as any);

		expect(result.success).toBe(false);
		if (result.success) {
			throw new Error("expected invalid parse result");
		}
		expect(result.error.code).toBe("InvalidInput");
	});

	it("rejects empty inflectional features after stripping unknown keys", () => {
		const result = dumling.de.parse.surface({
			language: "de",
			normalizedFullSurface: "Ging",
			surfaceKind: "Inflection",
			lemma: {
				language: "de",
				canonicalLemma: "gehen",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {},
				meaningInEmojis: "🚶",
			},
			inflectionalFeatures: {
				unknown: "x",
			},
		} as any);

		expect(result.success).toBe(false);
		if (result.success) {
			throw new Error("expected invalid parse result");
		}
		expect(result.error.code).toBe("InvalidInput");
		expect(result.error.issues?.some((issue) => issue.includes("inflectionalFeatures"))).toBe(
			true,
		);
	});

	it("rejects known-but-illegal german verbal inflection keys", () => {
		const result = dumling.de.parse.surface({
			language: "de",
			normalizedFullSurface: "gehen",
			surfaceKind: "Inflection",
			lemma: {
				language: "de",
				canonicalLemma: "gehen",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {},
				meaningInEmojis: "🚶",
			},
			inflectionalFeatures: {
				verbForm: "Inf",
				gender: "Masc",
			},
		} as any);

		expect(result.success).toBe(false);
		if (result.success) {
			throw new Error("expected invalid parse result");
		}
		expect(result.error.code).toBe("InvalidInput");
	});

	it("round-trips german ids and exposes english and hebrew language behavior", () => {
		const selection = dumling.de.parse.selection({
			language: "de",
			orthographicStatus: "Typo",
			selectionCoverage: "Partial",
			spelledSelection: "Sse",
			spellingRelation: "Canonical",
			surface: {
				language: "de",
				normalizedFullSurface: "See",
				surfaceKind: "Lemma",
				lemma: {
					language: "de",
					canonicalLemma: "see",
					lemmaKind: "Lexeme",
					lemmaSubKind: "NOUN",
					inherentFeatures: {
						gender: "Masc",
					},
					meaningInEmojis: "🌊",
				},
			},
		});

		expect(selection.success).toBe(true);
		if (!selection.success) {
			throw new Error(selection.error.message);
		}

		const id = dumling.de.id.encode(selection.data);
		const decoded = dumling.de.id.decode(id);
		const decodedAs = dumling.de.id.decodeAs("Selection", id);

		expect(decoded.success).toBe(true);
		expect(decodedAs.success).toBe(true);
		if (!decoded.success || !decodedAs.success) {
			throw new Error("expected successful decode");
		}
		expect(decoded.data.entityKind).toBe("Selection");
		expect(decodedAs.data).toEqual(selection.data);

		const englishLemma = dumling.en.create.lemma({
			canonicalLemma: "see",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "👀",
		});
		expect(englishLemma.language).toBe("en");
		expect(dumling.en.parse.lemma(englishLemma)).toEqual({
			success: true,
			data: englishLemma,
		});
		expect(
			schema.en.selection.standard.lemma.lexeme.noun().safeParse(
				dumling.en.convert.lemma.toSelection(englishLemma),
			).success,
		).toBe(true);

		const hebrewLemma = dumling.he.create.lemma({
			canonicalLemma: "כתב",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hebBinyan: "PAAL",
			},
			meaningInEmojis: "✍️",
		});
		expect(hebrewLemma.language).toBe("he");
		expect(dumling.he.parse.lemma(hebrewLemma)).toEqual({
			success: true,
			data: hebrewLemma,
		});
		expect(
			schema.he.selection.standard.lemma.lexeme.verb().safeParse(
				dumling.he.convert.lemma.toSelection(hebrewLemma),
			).success,
		).toBe(true);
	});

	it("reports decode failures for malformed ids and mismatched entity kinds", () => {
		expect(dumling.de.id.decode("dumling:%")).toEqual({
			success: false,
			error: {
				code: "MalformedId",
				message: "ID payload is not valid base64url",
			},
		});

		expect(dumling.de.id.decode(`dumling:${encodeBase64Url("not json")}`)).toEqual({
			success: false,
			error: {
				code: "MalformedId",
				message: "ID payload is not valid JSON",
			},
		});

		const invalidPayloadId = `dumling:${encodeBase64Url(
			JSON.stringify({
				language: "de",
				data: {
					language: "de",
					canonicalLemma: "see",
					lemmaKind: "Lexeme",
					lemmaSubKind: "NOUN",
					inherentFeatures: {},
					meaningInEmojis: "🌊",
				},
			}),
		)}`;

		expect(dumling.de.id.decode(invalidPayloadId)).toEqual({
			success: false,
			error: {
				code: "InvalidPayload",
				message: "ID payload shape is invalid",
			},
		});

		const selection = dumling.de.convert.lemma.toSelection(
			dumling.de.create.lemma({
				canonicalLemma: "See",
				lemmaKind: "Lexeme",
				lemmaSubKind: "NOUN",
				inherentFeatures: {},
				meaningInEmojis: "🌊",
			}),
		);
		const selectionId = dumling.de.id.encode(selection);

		expect(dumling.de.id.decodeAs("Lemma", selectionId)).toEqual({
			success: false,
			error: {
				code: "EntityMismatch",
				message: "Expected Lemma, received Selection",
			},
		});
	});
});
