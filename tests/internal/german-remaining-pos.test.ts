import { describe, expect, it } from "bun:test";
import { schemas } from "../../src/schema";
import { makeLexemeSurfaceReference } from "../helpers";

describe("German remaining POS schemas", () => {
	it("accepts representative feature bundles across implemented POS classes", () => {
		expect(
			schemas.de.entity.Selection.Standard.Inflection.Lexeme.ADJ().safeParse(
				{
					language: "de",
					orthographicStatus: "Standard",
					selectionCoverage: "Full",
					spelledSelection: "kleiner",
					spellingRelation: "Canonical",
					surface: {
						...makeLexemeSurfaceReference("de", "ADJ", "klein"),
						language: "de",
						normalizedFullSurface: "kleiner",
						surfaceKind: "Inflection",
						inflectionalFeatures: {
							case: "Dat",
							degree: "Cmp",
							gender: "Fem",
							number: "Sing",
						},
					},
				},
			).success,
		).toBe(true);

		expect(
			schemas.de.entity.Lemma.Lexeme.ADP().safeParse({
				language: "de",
				canonicalLemma: "zu",
				lemmaKind: "Lexeme",
				lemmaSubKind: "ADP",
				inherentFeatures: {
					governedCase: "Dat",
				},
				meaningInEmojis: "➡️",
			}).success,
		).toBe(true);

		expect(
			schemas.de.entity.Selection.Standard.Inflection.Lexeme.DET().safeParse(
				{
					language: "de",
					orthographicStatus: "Standard",
					selectionCoverage: "Full",
					spelledSelection: "dieser",
					spellingRelation: "Canonical",
					surface: {
						...makeLexemeSurfaceReference("de", "DET", "dies"),
						language: "de",
						normalizedFullSurface: "dieser",
						surfaceKind: "Inflection",
						inflectionalFeatures: {
							case: "Nom",
							gender: "Masc",
							number: "Sing",
						},
					},
				},
			).success,
		).toBe(true);

		expect(
			schemas.de.entity.Lemma.Lexeme.X().safeParse({
				language: "de",
				canonicalLemma: "foobar",
				lemmaKind: "Lexeme",
				lemmaSubKind: "X",
				inherentFeatures: {
					foreign: "Yes",
				},
				meaningInEmojis: "❓",
			}).success,
		).toBe(true);
	});

	it("keeps non-inflecting classes strict", () => {
		expect(
			"ADP" in schemas.de.entity.Selection.Standard.Inflection.Lexeme,
		).toBe(false);
		expect(
			"CCONJ" in schemas.de.entity.Selection.Standard.Inflection.Lexeme,
		).toBe(false);
		expect(
			"INTJ" in schemas.de.entity.Selection.Standard.Inflection.Lexeme,
		).toBe(false);
		expect(
			"PUNCT" in schemas.de.entity.Selection.Standard.Inflection.Lexeme,
		).toBe(false);
		expect(
			"SCONJ" in schemas.de.entity.Selection.Standard.Inflection.Lexeme,
		).toBe(false);
	});

	it("rejects unsupported feature values where subsets matter", () => {
		expect(
			schemas.de.entity.Lemma.Lexeme.ADV().safeParse({
				language: "de",
				canonicalLemma: "gern",
				lemmaKind: "Lexeme",
				lemmaSubKind: "ADV",
				inherentFeatures: {
					pronType: "Prs",
				},
				meaningInEmojis: "😊",
			}).success,
		).toBe(false);

		expect(
			Reflect.get(
				schemas.de.entity.Selection.Standard.Inflection.Lexeme,
				"ADP",
			),
		).toBeUndefined();

		expect(
			schemas.de.entity.Selection.Standard.Inflection.Lexeme.X().safeParse(
				{
					language: "de",
					orthographicStatus: "Standard",
					selectionCoverage: "Full",
					spelledSelection: "foobar",
					spellingRelation: "Canonical",
					surface: {
						...makeLexemeSurfaceReference("de", "X", "foobar"),
						language: "de",
						normalizedFullSurface: "foobar",
						surfaceKind: "Inflection",
						inflectionalFeatures: {
							tense: "Past",
						},
					},
				},
			).success,
		).toBe(false);
	});
});
