import { describe, expect, it } from "bun:test";
import { dumling } from "../../../src";
import {
	englishGiveUpTypoPartialGvaeSelection,
	englishGiveUpTypoPartialUpSelection,
	englishWalkInflectionSurface,
	englishWalkLemma,
	englishWalkStandardFullSelection,
	germanMasculineSeeLemma,
} from "../../helpers";

describe("ID helpers", () => {
	it("encodes and decodes each concrete entity kind", () => {
		const lemmaId = dumling.en.id.encode(englishWalkLemma);
		const surfaceId = dumling.en.id.encode(englishWalkInflectionSurface);
		const selectionId = dumling.en.id.encode(englishWalkStandardFullSelection);

		expect(lemmaId.startsWith("dumling:")).toBe(true);
		expect(surfaceId.startsWith("dumling:")).toBe(true);
		expect(selectionId.startsWith("dumling:")).toBe(true);

		expect(dumling.en.id.decodeAs("Lemma", lemmaId)).toEqual({
			success: true,
			data: englishWalkLemma,
		});
		expect(dumling.en.id.decodeAs("Surface", surfaceId)).toEqual({
			success: true,
			data: englishWalkInflectionSurface,
		});
		expect(dumling.en.id.decodeAs("Selection", selectionId)).toEqual({
			success: true,
			data: englishWalkStandardFullSelection,
		});
	});

	it("returns structured errors for malformed ids and language mismatch", () => {
		const malformed = dumling.en.id.decode("not-a-dumling-id");
		const germanLemmaId = dumling.de.id.encode(germanMasculineSeeLemma);
		const mismatch = dumling.en.id.decode(germanLemmaId);

		expect(malformed).toEqual({
			success: false,
			error: {
				code: "MalformedId",
				message: "Expected a dumling: ID",
			},
		});
		expect(mismatch).toEqual({
			success: false,
			error: {
				code: "LanguageMismatch",
				message: "Expected ID for en, received de",
			},
		});
	});

	it("returns entity mismatch for kind-specific decode requests", () => {
		const selectionId = dumling.en.id.encode(englishWalkStandardFullSelection);

		expect(dumling.en.id.decodeAs("Lemma", selectionId)).toEqual({
			success: false,
			error: {
				code: "EntityMismatch",
				message: "Expected Lemma, received Selection",
			},
		});
	});

	it("keeps partial typo selections distinct while preserving shared surface identity", () => {
		const upSelectionId = dumling.en.id.encode(englishGiveUpTypoPartialUpSelection);
		const gvaeSelectionId = dumling.en.id.encode(
			englishGiveUpTypoPartialGvaeSelection,
		);

		expect(upSelectionId).not.toBe(gvaeSelectionId);
		expect(
			dumling.en.id.encode(englishGiveUpTypoPartialUpSelection.surface),
		).toBe(dumling.en.id.encode(englishGiveUpTypoPartialGvaeSelection.surface));
	});

	it("keeps canonical and variant selections distinct", () => {
		const canonicalId = dumling.en.id.encode(englishWalkStandardFullSelection);
		const variantId = dumling.en.id.encode({
			...englishWalkStandardFullSelection,
			spellingRelation: "Variant",
		});

		expect(canonicalId).not.toBe(variantId);

		const decodedVariant = dumling.en.id.decodeAs("Selection", variantId);
		expect(decodedVariant.success).toBe(true);
		if (!decodedVariant.success) {
			throw new Error(decodedVariant.error.message);
		}
		expect(decodedVariant.data.spellingRelation).toBe("Variant");
	});
});
