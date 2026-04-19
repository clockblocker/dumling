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

describe("v2 API", () => {
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
			lemma,
		} as any);

		const typoSelection = dumling.de.create.selection.typo({
			language: "he",
			orthographicStatus: "Standard",
			selectionCoverage: "Full",
			spelledSelection: "Sse",
			spellingRelation: "Canonical",
			surface: lemmaSurface,
		} as any);

		expect(lemma.language).toBe("de");
		expect(lemmaSurface.language).toBe("de");
		expect(lemmaSurface.surfaceKind).toBe("Lemma");
		expect(typoSelection.language).toBe("de");
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

	it("round-trips german ids and exposes runtime stubs for other languages", () => {
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
		expect(() => dumling.en.create.lemma({} as never)).toThrow(
			"dumling.en is not implemented yet",
		);
		expect(dumling.en.parse.lemma({})).toEqual({
			success: false,
			error: {
				code: "LanguageNotImplemented",
				language: "en",
				message: "dumling.en is not implemented yet",
			},
		});
		expect(() => schema.he.lemma.lexeme.verb()).toThrow(
			"dumling.he is not implemented yet",
		);
	});

	it("reports decode failures for malformed ids and mismatched entity kinds", () => {
		expect(dumling.de.id.decode("dumling:v2:%")).toEqual({
			success: false,
			error: {
				code: "MalformedId",
				message: "ID payload is not valid base64url",
			},
		});

		expect(
			dumling.de.id.decode(`dumling:v2:${encodeBase64Url("not json")}`),
		).toEqual({
			success: false,
			error: {
				code: "MalformedId",
				message: "ID payload is not valid JSON",
			},
		});

		const unsupportedVersionId = `dumling:v2:${encodeBase64Url(
			JSON.stringify({
				v: 1,
				entityKind: "Lemma",
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

		expect(dumling.de.id.decode(unsupportedVersionId)).toEqual({
			success: false,
			error: {
				code: "UnsupportedIdVersion",
				message: "Unsupported Dumling ID version: 1",
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
