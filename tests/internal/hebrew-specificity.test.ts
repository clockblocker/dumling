import { describe, expect, it } from "bun:test";
import { schema } from "../../src/schema";
import { makeLexemeSurfaceReference } from "../helpers";

describe("Hebrew schema specificity", () => {
	it("accepts Hebrew-specific lexical and inflectional features", () => {
		expect(
			schema.he.lemma.lexeme.verb().safeParse({
				language: "he",
				canonicalLemma: "כתב",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {
					hebBinyan: "PAAL",
				},
				meaningInEmojis: "✍️",
			}).success,
		).toBe(true);

		expect(
			schema.he.selection.standard.inflection.lexeme.verb().safeParse({
				language: "he",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "כתבו",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("he", "VERB", "כתב"),
					language: "he",
					normalizedFullSurface: "כתבו",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						number: "Plur",
						person: "3",
						tense: "Past",
					},
				},
			}).success,
		).toBe(true);

		expect(
			schema.he.selection.standard.inflection.lexeme.noun().safeParse({
				language: "he",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "שנתיים",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("he", "NOUN", "שנה"),
					language: "he",
					normalizedFullSurface: "שנתיים",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						number: ["Dual", "Plur"],
					},
				},
			}).success,
		).toBe(true);
	});

	it("keeps Hebrew aligned with its implemented inventory", () => {
		expect("part" in schema.he.lemma.lexeme).toBe(true);
		expect("part" in schema.he.selection.standard.inflection.lexeme).toBe(false);
	});

	it("rejects unsupported Hebrew feature spillover", () => {
		expect(
			schema.he.lemma.lexeme.verb().safeParse({
				language: "he",
				canonicalLemma: "כתב",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {
					hasSepPrefix: "ab",
				},
				meaningInEmojis: "✍️",
			}).success,
		).toBe(false);
	});
});
