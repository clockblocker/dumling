import { describe, expect, it } from "bun:test";
import { dumling } from "../../src";
import {
	englishWalkLemmaSelection,
	englishWalkStandardFullSelection,
	hebrewKatvuInflectionSurface,
} from "../helpers";

const { schemaFor: lingSchemaFor } = dumling;

describe("selection spelling relation", () => {
	it("accepts lemma selections marked as spelling variants", () => {
		const result =
			lingSchemaFor.Selection.English.Standard.Lemma.Lexeme.VERB.safeParse(
				{
					...englishWalkLemmaSelection,
					spellingRelation: "Variant",
				},
			);

		expect(result.success).toBe(true);
	});

	it("accepts inflection selections marked as spelling variants", () => {
		const result =
			lingSchemaFor.Selection.English.Standard.Inflection.Lexeme.VERB.safeParse(
				{
					...englishWalkStandardFullSelection,
					spellingRelation: "Variant",
				},
			);

		expect(result.success).toBe(true);
	});

	it("accepts Hebrew pointed inflection variants without variant surface kinds", () => {
		const result =
			lingSchemaFor.Selection.Hebrew.Standard.Inflection.Lexeme.VERB.safeParse(
				{
					language: "Hebrew",
					orthographicStatus: "Standard",
					selectionCoverage: "Full",
					spelledSelection: "כָּתְבוּ",
					spellingRelation: "Variant",
					surface: {
						...hebrewKatvuInflectionSurface,
						normalizedFullSurface: "כָּתְבוּ",
					},
				},
			);

		expect(result.success).toBe(true);
	});

	it("requires spellingRelation once a selection is hydrated", () => {
		const { spellingRelation: _spellingRelation, ...legacySelection } =
			englishWalkLemmaSelection;

		const result =
			lingSchemaFor.Selection.English.Standard.Lemma.Lexeme.VERB.safeParse(
				legacySelection,
			);

		expect(result.success).toBe(false);
	});

	it("rejects legacy surfaceKind variant payloads", () => {
		const result =
			lingSchemaFor.Selection.English.Standard.Lemma.Lexeme.VERB.safeParse(
				{
					...englishWalkLemmaSelection,
					spellingRelation: "Variant",
					surface: {
						...englishWalkLemmaSelection.surface,
						surfaceKind: "Variant",
					},
				},
			);

		expect(result.success).toBe(false);
	});

	it("keeps unknown selections free of spelling metadata", () => {
		const result = lingSchemaFor.ObservedSelection.English.safeParse({
			language: "English",
			orthographicStatus: "Unknown",
			spelledSelection: "colour",
			spellingRelation: "Variant",
		});

		expect(result.success).toBe(false);
	});
});
