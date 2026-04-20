import { describe, expect, it } from "bun:test";
import { schema } from "../../src/schema";
import { makeLexemeSurfaceReference } from "../helpers";

describe("German verb schemas", () => {
	it("accept supported verb inflectional and inherent features", () => {
		expect(
			schema.de.selection.standard.inflection.lexeme.verb().safeParse({
				language: "de",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "ging",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("de", "VERB", "gehen"),
					language: "de",
					normalizedFullSurface: "ging",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						mood: "Sub",
						number: "Sing",
						person: "3",
						tense: "Past",
						verbForm: "Fin",
					},
				},
			}).success,
		).toBe(true);

		expect(
			schema.de.lemma.lexeme.verb().safeParse({
				language: "de",
				canonicalLemma: "mitkommen",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {
					hasSepPrefix: "mit",
				},
				meaningInEmojis: "🚶",
			}).success,
		).toBe(true);
	});

	it("rejects unsupported inherited features and impossible inflection combinations", () => {
		expect(
			schema.de.lemma.lexeme.verb().safeParse({
				language: "de",
				canonicalLemma: "mitkommen",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {
					phrasal: "Yes",
				},
				meaningInEmojis: "🚶",
			}).success,
		).toBe(false);

		expect(
			schema.de.lemma.lexeme.verb().safeParse({
				language: "de",
				canonicalLemma: "sich beeilen",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {
					reflex: "Yes",
				},
				meaningInEmojis: "🏃",
			}).success,
		).toBe(false);

		expect(
			schema.de.selection.standard.inflection.lexeme.verb().safeParse({
				language: "de",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "geht",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("de", "VERB", "gehen"),
					language: "de",
					normalizedFullSurface: "geht",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						gender: "Fem",
						mood: "Ind",
						number: "Sing",
						person: "3",
						tense: "Pres",
						verbForm: "Fin",
					},
				},
			}).success,
		).toBe(false);

		expect(
			schema.de.selection.standard.inflection.lexeme.verb().safeParse({
				language: "de",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "geh",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("de", "VERB", "gehen"),
					language: "de",
					normalizedFullSurface: "geh",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						mood: "Imp",
						tense: "Past",
						verbForm: "Fin",
					},
				},
			}).success,
		).toBe(false);
	});

	it("keeps the verb registry branch exposed", () => {
		expect(typeof schema.de.lemma.lexeme.verb().parse).toBe("function");
		expect(typeof schema.de.selection.standard.inflection.lexeme.verb().parse).toBe(
			"function",
		);
	});
});
