import type { Selection } from "../../../../src/types";
import {
	hebrewKatvuInflectionSurface,
	hebrewShanaLemmaSurface,
	hebrewUsAbbreviationLemmaSurface,
} from "./surfaces";

// Attestation: "הם [כתבו] מכתב."
export const hebrewKatvuStandardFullSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "כתבו",
	spellingRelation: "Canonical",
	surface: hebrewKatvuInflectionSurface,
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "VERB">;

// Attestation: "עוד [שנה] עברה."
export const hebrewShanaLemmaSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "שנה",
	spellingRelation: "Canonical",
	surface: hebrewShanaLemmaSurface,
} satisfies Selection<"he", "Standard", "Lemma", "Lexeme", "NOUN">;

// Attestation: "[ארה״ב] הודיעה על צעד חדש."
export const hebrewUsAbbreviationSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ארה״ב",
	spellingRelation: "Canonical",
	surface: hebrewUsAbbreviationLemmaSurface,
} satisfies Selection<"he", "Standard", "Lemma", "Lexeme", "PROPN">;

// Attestation: "הם [כָּתְבוּ] מכתב."
export const hebrewKatvuPointedVariantSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "כָּתְבוּ",
	spellingRelation: "Variant",
	surface: {
		...hebrewKatvuInflectionSurface,
		normalizedFullSurface: "כָּתְבוּ",
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "VERB">;
