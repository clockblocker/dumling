import { describe, expect, it } from "bun:test";
import { dumling } from "../../src";
import { schemaFor } from "../../src/schema";
import {
	hebrewKatavLemma,
	hebrewKatvuPointedVariantSelection,
	hebrewKatvuInflectionSurface,
	hebrewKatvuStandardFullSelection,
	hebrewShanaLemma,
	hebrewShanaLemmaSelection,
	hebrewShanaLemmaSurface,
	hebrewUsAbbreviationLemma,
	hebrewUsAbbreviationLemmaSurface,
	hebrewUsAbbreviationSelection,
} from "../helpers";

const {
	idCodec: DumlingIdCodec,
	operation: lingOperation,
} = dumling;

describe("Hebrew attested entities", () => {
	it("stay valid against the public Hebrew schemas", () => {
		expect(
			schemaFor.Lemma.Hebrew.Lexeme.VERB.safeParse(hebrewKatavLemma).success,
		).toBe(true);
		expect(
			schemaFor.Lemma.Hebrew.Lexeme.NOUN.safeParse(hebrewShanaLemma).success,
		).toBe(true);
		expect(
			schemaFor.Lemma.Hebrew.Lexeme.PROPN.safeParse(
				hebrewUsAbbreviationLemma,
			).success,
		).toBe(true);
		expect(
			schemaFor.Surface.Hebrew.Inflection.Lexeme.VERB.safeParse(
				hebrewKatvuInflectionSurface,
			).success,
		).toBe(true);
		expect(
			schemaFor.Surface.Hebrew.Lemma.Lexeme.NOUN.safeParse(
				hebrewShanaLemmaSurface,
			).success,
		).toBe(true);
		expect(
			schemaFor.Surface.Hebrew.Lemma.Lexeme.PROPN.safeParse(
				hebrewUsAbbreviationLemmaSurface,
			).success,
		).toBe(true);
		expect(
			schemaFor.Selection.Hebrew.Standard.Inflection.Lexeme.VERB.safeParse(
				hebrewKatvuStandardFullSelection,
			).success,
		).toBe(true);
		expect(
			schemaFor.Selection.Hebrew.Standard.Lemma.Lexeme.NOUN.safeParse(
				hebrewShanaLemmaSelection,
			).success,
		).toBe(true);
		expect(
			schemaFor.Selection.Hebrew.Standard.Lemma.Lexeme.PROPN.safeParse(
				hebrewUsAbbreviationSelection,
			).success,
		).toBe(true);
		expect(
			schemaFor.Selection.Hebrew.Standard.Inflection.Lexeme.VERB.safeParse(
				hebrewKatvuPointedVariantSelection,
			).success,
		).toBe(true);
	});

	it("work with the public operation helpers", () => {
		expect(
			lingOperation.extract.surface.fromSelection(
				hebrewShanaLemmaSelection,
			),
		).toBe(hebrewShanaLemmaSurface);
		expect(
			lingOperation.extract.lemma.fromSurface(hebrewShanaLemmaSurface),
		).toBe(hebrewShanaLemma);
	});

	it("round-trip through the Hebrew Dumling ID codec", () => {
		const lemmaId = DumlingIdCodec.Hebrew.makeDumlingIdFor(hebrewKatavLemma);
		const surfaceId = DumlingIdCodec.Hebrew.makeDumlingIdFor(
			hebrewKatvuInflectionSurface,
		);
		const selectionId = DumlingIdCodec.Hebrew.makeDumlingIdFor(
			hebrewKatvuStandardFullSelection,
		);
		const pointedVariantSelectionId = DumlingIdCodec.Hebrew.makeDumlingIdFor(
			hebrewKatvuPointedVariantSelection,
		);
		const abbreviationLemmaId = DumlingIdCodec.Hebrew.makeDumlingIdFor(
			hebrewUsAbbreviationLemma,
		);
		const abbreviationSelectionId = DumlingIdCodec.Hebrew.makeDumlingIdFor(
			hebrewUsAbbreviationSelection,
		);

		expect(
			DumlingIdCodec.Hebrew.tryToDecodeAs("Lemma", lemmaId)._unsafeUnwrap(),
		).toEqual(hebrewKatavLemma);
		expect(
			DumlingIdCodec.Hebrew.tryToDecodeAs(
				"Surface",
				surfaceId,
			)._unsafeUnwrap(),
		).toEqual(hebrewKatvuInflectionSurface);
		expect(
			DumlingIdCodec.Hebrew.tryToDecodeAs(
				"Selection",
				selectionId,
			)._unsafeUnwrap(),
		).toEqual(hebrewKatvuStandardFullSelection);
		expect(
			DumlingIdCodec.Hebrew.tryToDecodeAs(
				"Selection",
				pointedVariantSelectionId,
			)._unsafeUnwrap(),
		).toEqual(hebrewKatvuPointedVariantSelection);
		expect(
			DumlingIdCodec.Hebrew.tryToDecodeAs(
				"Lemma",
				abbreviationLemmaId,
			)._unsafeUnwrap(),
		).toEqual(hebrewUsAbbreviationLemma);
		expect(
			DumlingIdCodec.Hebrew.tryToDecodeAs(
				"Selection",
				abbreviationSelectionId,
			)._unsafeUnwrap(),
		).toEqual(hebrewUsAbbreviationSelection);
	});
});
