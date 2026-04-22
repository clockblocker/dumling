import { describe, expect, it } from "bun:test";
import { schemasFor } from "../../src/schema";
import {
	englishWalkCitationSelection,
	englishWalkStandardFullSelection,
	hebrewKatvuPointedVariantSelection,
} from "../helpers";

describe("selection spelling relation", () => {
	it("accepts citation selections marked as spelling variants", () => {
		expect(
			schemasFor.en.entity.Selection.Standard.Citation.Lexeme.VERB().safeParse(
				{
					...englishWalkCitationSelection,
					spellingRelation: "Variant",
				},
			).success,
		).toBe(true);
	});

	it("accepts inflection selections marked as spelling variants", () => {
		expect(
			schemasFor.en.entity.Selection.Standard.Inflection.Lexeme.VERB().safeParse(
				{
					...englishWalkStandardFullSelection,
					spellingRelation: "Variant",
				},
			).success,
		).toBe(true);
	});

	it("accepts Hebrew pointed inflection variants without variant surface kinds", () => {
		expect(
			schemasFor.he.entity.Selection.Standard.Inflection.Lexeme.VERB().safeParse(
				hebrewKatvuPointedVariantSelection,
			).success,
		).toBe(true);
	});

	it("rejects legacy surfaceKind variant payloads", () => {
		expect(
			schemasFor.en.entity.Selection.Standard.Citation.Lexeme.VERB().safeParse(
				{
					...englishWalkCitationSelection,
					spellingRelation: "Variant",
					surface: {
						...englishWalkCitationSelection.surface,
						surfaceKind: "Variant",
					},
				},
			).success,
		).toBe(false);
	});
});
