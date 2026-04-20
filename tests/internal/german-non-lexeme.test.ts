import { describe, expect, it } from "bun:test";
import { schema } from "../../src/schema";
import {
	germanAbPrefixLemma,
	germanAufJedenFallDiscourseFormulaSelection,
	germanAufJedenFallPartialSelection,
	makeMorphemeSurfaceReference,
} from "../helpers";

describe("German non-lexeme schemas", () => {
	it("accept German morpheme and phraseme entities", () => {
		expect(
			schema.de.lemma.morpheme.prefix().safeParse(germanAbPrefixLemma).success,
		).toBe(true);
		expect(
			schema.de.selection.standard.lemma.phraseme.discourseformula().safeParse(
				germanAufJedenFallDiscourseFormulaSelection,
			).success,
		).toBe(true);
		expect(
			schema.de.selection.standard.lemma.phraseme.discourseformula().safeParse(
				germanAufJedenFallPartialSelection,
			).success,
		).toBe(true);
	});

	it("keeps discourse-formula features scoped to discourse formulas", () => {
		expect(
			schema.de.lemma.phraseme.discourseformula().safeParse({
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
			schema.de.lemma.phraseme.aphorism().safeParse({
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
		expect(typeof schema.de.selection.standard.lemma.morpheme.prefix().parse).toBe(
			"function",
		);
		expect(
			"morpheme" in schema.de.selection.standard.inflection,
		).toBe(false);
		expect(
			schema.de.selection.typo.lemma.morpheme.suffix().safeParse({
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
