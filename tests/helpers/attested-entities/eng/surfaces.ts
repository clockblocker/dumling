import type { Surface } from "../../../../src/types";
import { englishGiveUpLemma, englishWalkLemma } from "./lemmas";

// Attestation: "They [walk] home together."
export const englishWalkLemmaSurface = {
	language: "en",
	normalizedFullSurface: "walk",
	surfaceKind: "Lemma",
	lemma: englishWalkLemma,
} satisfies Surface<"en", "Lemma", "Lexeme", "VERB">;

// Attestation: "They [walk] home together."
export const englishWalkInflectionSurface = {
	inflectionalFeatures: {
		tense: "Pres",
		verbForm: "Fin",
	},
	language: "en",
	normalizedFullSurface: "walk",
	surfaceKind: "Inflection",
	lemma: englishWalkLemma,
} satisfies Surface<"en", "Inflection", "Lexeme", "VERB">;

// Attestation: "Mark gvae [up] on it."
export const englishGiveUpInflectionSurface = {
	inflectionalFeatures: {
		tense: "Past",
		verbForm: "Fin",
	},
	language: "en",
	normalizedFullSurface: "gave up",
	surfaceKind: "Inflection",
	lemma: englishGiveUpLemma,
} satisfies Surface<"en", "Inflection", "Lexeme", "VERB">;
