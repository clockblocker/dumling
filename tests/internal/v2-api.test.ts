import { describe, expect, it } from "bun:test";
import { dumling } from "../../src";
import { schema } from "../../src/schema";
import type { Lemma, Selection } from "../../src/types";

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

		const typedLemma: Lemma<"de", "Lexeme", "NOUN"> = lemma;
		const surface = dumling.de.convert.lemma.toSurface(typedLemma);
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
});
