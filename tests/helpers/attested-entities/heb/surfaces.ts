import type { Surface } from "../../../../src";
import {
	hebrewKatavLemma,
	hebrewShanaLemma,
	hebrewUsAbbreviationLemma,
} from "./lemmas";

// Attestation: "הם [כתבו] מכתב."
export const hebrewKatvuInflectionSurface = {
	inflectionalFeatures: {
		number: "Plur",
		person: "3",
		tense: "Past",
	},
	language: "Hebrew",
	normalizedFullSurface: "כתבו",
	surfaceKind: "Inflection",
	lemma: hebrewKatavLemma,
} satisfies Surface<
	"Hebrew",
	"Inflection",
	"Lexeme",
	"VERB"
>;

// Attestation: "עוד [שנה] עברה."
export const hebrewShanaLemmaSurface = {
	language: "Hebrew",
	normalizedFullSurface: "שנה",
	surfaceKind: "Lemma",
	lemma: hebrewShanaLemma,
} satisfies Surface<"Hebrew", "Lemma", "Lexeme", "NOUN">;

// Attestation: "[ארה״ב] הודיעה על צעד חדש."
export const hebrewUsAbbreviationLemmaSurface = {
	language: "Hebrew",
	normalizedFullSurface: "ארה״ב",
	surfaceKind: "Lemma",
	lemma: hebrewUsAbbreviationLemma,
} satisfies Surface<"Hebrew", "Lemma", "Lexeme", "PROPN">;
