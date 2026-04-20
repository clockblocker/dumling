import { describe, expect, it } from "bun:test";
import { schema } from "../../src/schema";
import {
	englishWalkLemmaSelection,
	englishWalkStandardFullSelection,
	hebrewKatvuPointedVariantSelection,
} from "../helpers";

describe("selection spelling relation", () => {
	it("accepts lemma selections marked as spelling variants", () => {
		expect(
			schema.en.selection.standard.lemma.lexeme.verb().safeParse({
				...englishWalkLemmaSelection,
				spellingRelation: "Variant",
			}).success,
		).toBe(true);
	});

	it("accepts inflection selections marked as spelling variants", () => {
		expect(
			schema.en.selection.standard.inflection.lexeme.verb().safeParse({
				...englishWalkStandardFullSelection,
				spellingRelation: "Variant",
			}).success,
		).toBe(true);
	});

	it("accepts Hebrew pointed inflection variants without variant surface kinds", () => {
		expect(
			schema.he.selection.standard.inflection.lexeme.verb().safeParse(
				hebrewKatvuPointedVariantSelection,
			).success,
		).toBe(true);
	});

	it("rejects legacy surfaceKind variant payloads", () => {
		expect(
			schema.en.selection.standard.lemma.lexeme.verb().safeParse({
				...englishWalkLemmaSelection,
				spellingRelation: "Variant",
				surface: {
					...englishWalkLemmaSelection.surface,
					surfaceKind: "Variant",
				},
			}).success,
		).toBe(false);
	});
});
