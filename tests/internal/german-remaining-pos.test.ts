import { describe, expect, it } from "bun:test";
import { schema } from "../../src/schema";
import { makeLexemeSurfaceReference } from "../helpers";

describe("German remaining POS schemas", () => {
	it("accepts representative feature bundles across implemented POS classes", () => {
		expect(
			schema.de.selection.standard.inflection.lexeme.adj().safeParse({
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
			}).success,
		).toBe(true);

		expect(
			schema.de.lemma.lexeme.adp().safeParse({
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
			schema.de.selection.standard.inflection.lexeme.det().safeParse({
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
			}).success,
		).toBe(true);

		expect(
			schema.de.lemma.lexeme.x().safeParse({
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
		expect("adp" in schema.de.selection.standard.inflection.lexeme).toBe(false);
		expect("cconj" in schema.de.selection.standard.inflection.lexeme).toBe(
			false,
		);
		expect("intj" in schema.de.selection.standard.inflection.lexeme).toBe(false);
		expect("punct" in schema.de.selection.standard.inflection.lexeme).toBe(
			false,
		);
		expect("sconj" in schema.de.selection.standard.inflection.lexeme).toBe(
			false,
		);
	});

	it("rejects unsupported feature values where subsets matter", () => {
		expect(
			schema.de.lemma.lexeme.adv().safeParse({
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
			Reflect.get(schema.de.selection.standard.inflection.lexeme, "adp"),
		).toBeUndefined();

		expect(
			schema.de.selection.standard.inflection.lexeme.x().safeParse({
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
			}).success,
		).toBe(false);
	});
});
