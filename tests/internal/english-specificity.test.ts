import { describe, expect, it } from "bun:test";
import { schema } from "../../src/schema";
import { makeLexemeSurfaceReference } from "../helpers";

describe("English schema specificity", () => {
	it("keeps English adjective and noun morphology narrow", () => {
		expect(
			schema.en.selection.standard.inflection.lexeme.adj().safeParse({
				language: "en",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "smaller",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("en", "ADJ", "small"),
					language: "en",
					normalizedFullSurface: "smaller",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						degree: "Cmp",
					},
				},
			}).success,
		).toBe(true);

		expect(
			schema.en.selection.standard.inflection.lexeme.adj().safeParse({
				language: "en",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "small",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("en", "ADJ", "small"),
					language: "en",
					normalizedFullSurface: "small",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						case: "Dat",
					},
				},
			}).success,
		).toBe(false);

		expect(
			schema.en.selection.standard.inflection.lexeme.noun().safeParse({
				language: "en",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "scissors",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("en", "NOUN", "scissors"),
					language: "en",
					normalizedFullSurface: "scissors",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						number: "Ptan",
					},
				},
			}).success,
		).toBe(true);

		expect(
			schema.en.lemma.lexeme.noun().safeParse({
				language: "en",
				canonicalLemma: "dog",
				lemmaKind: "Lexeme",
				lemmaSubKind: "NOUN",
				inherentFeatures: {
					gender: "Masc",
				},
				meaningInEmojis: "🐕",
			}).success,
		).toBe(false);
	});

	it("removes German-only verb morphology from English", () => {
		expect(
			schema.en.lemma.lexeme.verb().safeParse({
				language: "en",
				canonicalLemma: "look",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {
					hasGovPrep: "to",
					phrasal: "Yes",
				},
				meaningInEmojis: "👀",
			}).success,
		).toBe(true);

		expect(
			schema.en.lemma.lexeme.verb().safeParse({
				language: "en",
				canonicalLemma: "wash",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
				inherentFeatures: {
					hasSepPrefix: "up",
				},
				meaningInEmojis: "🧼",
			}).success,
		).toBe(false);

		expect(
			schema.en.selection.standard.inflection.lexeme.verb().safeParse({
				language: "en",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "washing",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("en", "VERB", "wash"),
					language: "en",
					normalizedFullSurface: "washing",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						verbForm: "Ger",
					},
				},
			}).success,
		).toBe(true);

		expect(
			schema.en.selection.standard.inflection.lexeme.verb().safeParse({
				language: "en",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "washed",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("en", "VERB", "wash"),
					language: "en",
					normalizedFullSurface: "washed",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						gender: "Fem",
					},
				},
			}).success,
		).toBe(false);
	});

	it("keeps pronoun, determiner, and symbol features aligned with the English catalog", () => {
		expect(
			schema.en.selection.standard.inflection.lexeme.pron().safeParse({
				language: "en",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "him",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("en", "PRON", "him"),
					language: "en",
					normalizedFullSurface: "him",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						case: "Acc",
					},
				},
			}).success,
		).toBe(true);

		expect(
			schema.en.lemma.lexeme.det().safeParse({
				language: "en",
				canonicalLemma: "half",
				lemmaKind: "Lexeme",
				lemmaSubKind: "DET",
				inherentFeatures: {
					abbr: "Yes",
					extPos: "ADV",
					numForm: "Word",
					numType: "Frac",
					pronType: "Rcp",
					style: "Vrnc",
				},
				meaningInEmojis: "🧮",
			}).success,
		).toBe(true);

		expect(
			schema.en.selection.standard.inflection.lexeme.sym().safeParse({
				language: "en",
				orthographicStatus: "Standard",
				selectionCoverage: "Full",
				spelledSelection: "%",
				spellingRelation: "Canonical",
				surface: {
					...makeLexemeSurfaceReference("en", "SYM", "%"),
					language: "en",
					normalizedFullSurface: "%",
					surfaceKind: "Inflection",
					inflectionalFeatures: {
						number: "Sing",
					},
				},
			}).success,
		).toBe(true);

		expect(typeof schema.en.selection.standard.inflection.lexeme.verb().parse).toBe(
			"function",
		);
	});
});
