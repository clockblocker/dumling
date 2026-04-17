import type { Selection } from "../../../../src";
import {
	hebrewKatvuInflectionSurface,
	hebrewShanaLemmaSurface,
	hebrewUsAbbreviationLemmaSurface,
} from "./surfaces";

// Attestation: "הם [כתבו] מכתב."
export const hebrewKatvuStandardFullSelection = {
	language: "Hebrew",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "כתבו",
	spellingRelation: "Canonical",
	surface: hebrewKatvuInflectionSurface,
} satisfies Selection<"Hebrew">;

// Attestation: "עוד [שנה] עברה."
export const hebrewShanaLemmaSelection = {
	language: "Hebrew",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "שנה",
	spellingRelation: "Canonical",
	surface: hebrewShanaLemmaSurface,
} satisfies Selection<"Hebrew", "Standard", "Lemma", "Lexeme", "NOUN">;

// Attestation: "[ארה״ב] הודיעה על צעד חדש."
export const hebrewUsAbbreviationSelection = {
	language: "Hebrew",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ארה״ב",
	spellingRelation: "Canonical",
	surface: hebrewUsAbbreviationLemmaSurface,
} satisfies Selection<"Hebrew", "Standard", "Lemma", "Lexeme", "PROPN">;

// Attestation: "הם [כָּתְבוּ] מכתב."
export const hebrewKatvuPointedVariantSelection = {
	language: "Hebrew",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "כָּתְבוּ",
	spellingRelation: "Variant",
	surface: {
		...hebrewKatvuInflectionSurface,
		normalizedFullSurface: "כָּתְבוּ",
	},
} satisfies Selection<"Hebrew">;
