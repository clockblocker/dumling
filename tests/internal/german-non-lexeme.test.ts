import { describe, expect, it } from "bun:test";
import { schemas } from "../../src/schema";
import {
	germanAbPrefixLemma,
	germanAufJedenFallDiscourseFormulaSelection,
	germanAufJedenFallPartialSelection,
	makeMorphemeSurfaceReference,
} from "../helpers";

describe("German non-lexeme schemas", () => {
	it("accept German morpheme and phraseme entities", () => {
		expect(
			schemas.de.entity.Lemma.Morpheme.Prefix().safeParse(
				germanAbPrefixLemma,
			).success,
		).toBe(true);
		expect(
			schemas.de.entity.Selection.Standard.Lemma.Phraseme.DiscourseFormula().safeParse(
				germanAufJedenFallDiscourseFormulaSelection,
			).success,
		).toBe(true);
		expect(
			schemas.de.entity.Selection.Standard.Lemma.Phraseme.DiscourseFormula().safeParse(
				germanAufJedenFallPartialSelection,
			).success,
		).toBe(true);
	});

	it("keeps discourse-formula features scoped to discourse formulas", () => {
		expect(
			schemas.de.entity.Lemma.Phraseme.DiscourseFormula().safeParse({
				language: "de",
				canonicalLemma: "auf jeden fall",
				lemmaKind: "Phraseme",
				lemmaSubKind: "DiscourseFormula",
				inherentFeatures: {
					discourseFormulaRole: "Reaction",
				},
				meaningInEmojis: "✅",
			}).success,
		).toBe(true);

		expect(
			schemas.de.entity.Lemma.Phraseme.Aphorism().safeParse({
				language: "de",
				canonicalLemma: "zeit ist geld",
				lemmaKind: "Phraseme",
				lemmaSubKind: "Aphorism",
				inherentFeatures: {
					discourseFormulaRole: "Reaction",
				},
				meaningInEmojis: "⏳💰",
			}).success,
		).toBe(false);
	});

	it("keeps non-lexeme branches lemma-only", () => {
		expect(
			typeof schemas.de.entity.Selection.Standard.Lemma.Morpheme.Prefix()
				.parse,
		).toBe("function");
		expect(
			"Morpheme" in schemas.de.entity.Selection.Standard.Inflection,
		).toBe(false);
		expect(
			schemas.de.entity.Selection.Typo.Lemma.Morpheme.Suffix().safeParse({
				language: "de",
				orthographicStatus: "Typo",
				selectionCoverage: "Full",
				spelledSelection: "hait",
				spellingRelation: "Canonical",
				surface: {
					...makeMorphemeSurfaceReference("de", "Suffix", "heit"),
					language: "de",
					normalizedFullSurface: "heit",
					surfaceKind: "Lemma",
				},
			}).success,
		).toBe(true);
	});
});
