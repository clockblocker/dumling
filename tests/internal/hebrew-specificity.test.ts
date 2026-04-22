import { describe, expect, it } from "bun:test";
import { schemas } from "../../src/schema";
import { makeLexemeSurfaceReference } from "../helpers";

describe("Hebrew schema specificity", () => {
	it("accepts Hebrew-specific lexical and inflectional features", () => {
		expect(
			schemas.he.entity.Lemma.Lexeme.VERB().safeParse({
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
			schemas.he.entity.Selection.Standard.Inflection.Lexeme.VERB().safeParse(
				{
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
				},
			).success,
		).toBe(true);

		expect(
			schemas.he.entity.Selection.Standard.Inflection.Lexeme.NOUN().safeParse(
				{
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
				},
			).success,
		).toBe(true);
	});

	it("keeps Hebrew aligned with its implemented inventory", () => {
		expect("PART" in schemas.he.entity.Lemma.Lexeme).toBe(true);
		expect(
			"PART" in schemas.he.entity.Selection.Standard.Inflection.Lexeme,
		).toBe(false);
	});

	it("rejects unsupported Hebrew feature spillover", () => {
		expect(
			schemas.he.entity.Lemma.Lexeme.VERB().safeParse({
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
