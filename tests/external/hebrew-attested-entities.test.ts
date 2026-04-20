import { describe, expect, it } from "bun:test";
import { dumling } from "../../src";
import { schema } from "../../src/schema";
import {
	hebrewKatavLemma,
	hebrewKatvuInflectionSurface,
	hebrewKatvuPointedVariantSelection,
	hebrewKatvuStandardFullSelection,
	hebrewShanaLemma,
	hebrewShanaLemmaSelection,
	hebrewShanaLemmaSurface,
	hebrewUsAbbreviationLemma,
	hebrewUsAbbreviationLemmaSurface,
	hebrewUsAbbreviationSelection,
} from "../helpers";

describe("Hebrew attested entities", () => {
	it("stay valid against the public Hebrew schemas", () => {
		expect(schema.he.lemma.lexeme.verb().safeParse(hebrewKatavLemma).success).toBe(
			true,
		);
		expect(schema.he.lemma.lexeme.noun().safeParse(hebrewShanaLemma).success).toBe(
			true,
		);
		expect(
			schema.he.lemma.lexeme.propn().safeParse(hebrewUsAbbreviationLemma)
				.success,
		).toBe(true);
		expect(
			schema.he.surface.inflection.lexeme.verb().safeParse(
				hebrewKatvuInflectionSurface,
			).success,
		).toBe(true);
		expect(
			schema.he.surface.lemma.lexeme.noun().safeParse(hebrewShanaLemmaSurface)
				.success,
		).toBe(true);
		expect(
			schema.he.surface.lemma.lexeme.propn().safeParse(
				hebrewUsAbbreviationLemmaSurface,
			).success,
		).toBe(true);
		expect(
			schema.he.selection.standard.inflection.lexeme.verb().safeParse(
				hebrewKatvuStandardFullSelection,
			).success,
		).toBe(true);
		expect(
			schema.he.selection.standard.lemma.lexeme.noun().safeParse(
				hebrewShanaLemmaSelection,
			).success,
		).toBe(true);
		expect(
			schema.he.selection.standard.lemma.lexeme.propn().safeParse(
				hebrewUsAbbreviationSelection,
			).success,
		).toBe(true);
		expect(
			schema.he.selection.standard.inflection.lexeme.verb().safeParse(
				hebrewKatvuPointedVariantSelection,
			).success,
		).toBe(true);
	});

	it("work with the public operation helpers", () => {
		expect(dumling.he.extract.lemma(hebrewKatvuStandardFullSelection)).toBe(
			hebrewKatavLemma,
		);
		expect(dumling.he.extract.lemma(hebrewShanaLemmaSurface)).toBe(hebrewShanaLemma);
		expect(dumling.he.convert.lemma.toSurface(hebrewShanaLemma)).toEqual(
			hebrewShanaLemmaSurface,
		);
		expect(dumling.he.describe.as.selection(hebrewKatvuInflectionSurface)).toEqual({
			language: "he",
			orthographicStatus: "Standard",
			surfaceKind: "Inflection",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
		});
	});

	it("round-trips through the Hebrew ID helpers", () => {
		const lemmaId = dumling.he.id.encode(hebrewKatavLemma);
		const surfaceId = dumling.he.id.encode(hebrewKatvuInflectionSurface);
		const selectionId = dumling.he.id.encode(hebrewKatvuStandardFullSelection);
		const pointedVariantId = dumling.he.id.encode(
			hebrewKatvuPointedVariantSelection,
		);
		const abbreviationLemmaId = dumling.he.id.encode(hebrewUsAbbreviationLemma);
		const abbreviationSelectionId = dumling.he.id.encode(
			hebrewUsAbbreviationSelection,
		);

		expect(dumling.he.id.decodeAs("Lemma", lemmaId)).toEqual({
			success: true,
			data: hebrewKatavLemma,
		});
		expect(dumling.he.id.decodeAs("Surface", surfaceId)).toEqual({
			success: true,
			data: hebrewKatvuInflectionSurface,
		});
		expect(dumling.he.id.decodeAs("Selection", selectionId)).toEqual({
			success: true,
			data: hebrewKatvuStandardFullSelection,
		});
		expect(dumling.he.id.decodeAs("Selection", pointedVariantId)).toEqual({
			success: true,
			data: hebrewKatvuPointedVariantSelection,
		});
		expect(dumling.he.id.decodeAs("Lemma", abbreviationLemmaId)).toEqual({
			success: true,
			data: hebrewUsAbbreviationLemma,
		});
		expect(dumling.he.id.decodeAs("Selection", abbreviationSelectionId)).toEqual({
			success: true,
			data: hebrewUsAbbreviationSelection,
		});
	});
});
