import { describe, expect, it } from "bun:test";
import {
	dumling,
	type Lemma,
	type ObservedSelection,
} from "../../../src";
import {
	englishGiveUpTypoPartialGvaeSelection,
	englishGiveUpTypoPartialUpSelection,
	englishWalkLemma,
	englishWalkInflectionSurface,
	englishWalkStandardFullSelection,
	germanMasculineSeeLemma,
} from "../../helpers";

const { idCodec: DumlingIdCodec, operation: lingOperation } = dumling;

describe("DumlingIdCodec", () => {
	it("encodes and decodes each concrete entity kind", () => {
		const lemma = englishWalkLemma;
		const surface = englishWalkInflectionSurface;
		const selection = englishWalkStandardFullSelection;

		const lemmaId = DumlingIdCodec.English.makeDumlingIdFor(lemma);
		const surfaceId = DumlingIdCodec.English.makeDumlingIdFor(surface);
		const selectionId = DumlingIdCodec.English.makeDumlingIdFor(selection);

		expect(lemmaId.startsWith("ling:v1:EN:LEM;")).toBe(true);
		expect(surfaceId.startsWith("ling:v1:EN:SURF;")).toBe(true);
		expect(selectionId.startsWith("ling:v1:EN:SEL;")).toBe(true);

		const decodedLemma = DumlingIdCodec.English.tryToDecodeAs(
			"Lemma",
			lemmaId,
		);
		const decodedSurface = DumlingIdCodec.English.tryToDecodeAs("Surface", surfaceId);
		const decodedSelection = DumlingIdCodec.English.tryToDecodeAs(
			"Selection",
			selectionId,
		);

		expect(decodedLemma.isOk()).toBe(true);
		expect(decodedSurface.isOk()).toBe(true);
		expect(decodedSelection.isOk()).toBe(true);
		expect(decodedLemma._unsafeUnwrap()).toEqual(lemma);
		expect(decodedSurface._unsafeUnwrap()).toEqual(surface);
		expect(decodedSelection._unsafeUnwrap()).toEqual(selection);
		expect(decodedSelection._unsafeUnwrap().orthographicStatus).not.toBe(
			"Unknown",
		);
	});

	it("rejects unknown selections at runtime", () => {
		const unknownSelection = {
			language: "English",
			orthographicStatus: "Unknown",
			spelledSelection: "wlk",
		} satisfies ObservedSelection<"English">;

		expect(() =>
			DumlingIdCodec.English.makeDumlingIdFor(
				unknownSelection as never,
			),
		).toThrow("Unknown selections cannot be encoded as Dumling IDs");
	});

	it("returns structured errors for malformed ids and language mismatch", () => {
		const malformed = DumlingIdCodec.English.tryToDecode("not-a-ling-id");
		const germanLemmaId = DumlingIdCodec.German.makeDumlingIdFor(
			germanMasculineSeeLemma satisfies Lemma<"German", "Lexeme", "NOUN">,
		);
		const mismatch = DumlingIdCodec.English.tryToDecode(germanLemmaId);

		expect(malformed.isErr()).toBe(true);
		expect(malformed._unsafeUnwrapErr().code).toBe("MalformedDumlingId");
		expect(mismatch.isErr()).toBe(true);
		expect(mismatch._unsafeUnwrapErr().code).toBe("LanguageMismatch");
	});

	it("returns entity mismatch for kind-specific decode requests", () => {
		const resolvedId = DumlingIdCodec.English.makeDumlingIdFor(
			englishWalkInflectionSurface,
		);

		const mismatch = DumlingIdCodec.English.tryToDecodeAs("Lemma", resolvedId);

		expect(mismatch.isErr()).toBe(true);
		expect(mismatch._unsafeUnwrapErr().code).toBe("EntityMismatch");
	});

	it("serializes feature bags canonically", () => {
		const left = {
			...englishWalkInflectionSurface,
			inflectionalFeatures: {
				tense: "Pres" as const,
				verbForm: "Fin" as const,
			},
		};
		const right = {
			...englishWalkInflectionSurface,
			inflectionalFeatures: {
				tense: "Pres" as const,
				verbForm: "Fin" as const,
			},
		};

		expect(DumlingIdCodec.English.makeDumlingIdFor(left)).toBe(
			DumlingIdCodec.English.makeDumlingIdFor(right),
		);
	});

	it("keeps partial typo selections distinct while preserving shared surface identity", () => {
		const upSelection = englishGiveUpTypoPartialUpSelection;
		const gvaeSelection = englishGiveUpTypoPartialGvaeSelection;

		const upSelectionId = DumlingIdCodec.English.makeDumlingIdFor(upSelection);
		const gvaeSelectionId =
			DumlingIdCodec.English.makeDumlingIdFor(gvaeSelection);

		expect(upSelectionId).not.toBe(gvaeSelectionId);

		const upSurface =
			lingOperation.extract.surface.fromSelection(upSelection);
		const gvaeSurface =
			lingOperation.extract.surface.fromSelection(gvaeSelection);

		expect(DumlingIdCodec.English.makeDumlingIdFor(upSurface)).toBe(
			DumlingIdCodec.English.makeDumlingIdFor(gvaeSurface),
		);
	});

	it("keeps canonical and variant selections distinct in Dumling IDs", () => {
		const canonicalSelection = englishWalkStandardFullSelection;
		const variantSelection = {
			...englishWalkStandardFullSelection,
			spelledSelection: "walk",
			spellingRelation: "Variant" as const,
		};

		const canonicalId =
			DumlingIdCodec.English.makeDumlingIdFor(canonicalSelection);
		const variantId = DumlingIdCodec.English.makeDumlingIdFor(variantSelection);

		expect(canonicalId).not.toBe(variantId);
		expect(
			DumlingIdCodec.English.tryToDecodeAs(
				"Selection",
				variantId,
			)._unsafeUnwrap().spellingRelation,
		).toBe("Variant");
	});
});
