import type { Surface } from "../../../../src";
import { englishWalkLemma } from "./lemmas";

const englishGiveUpLemma = {
	canonicalLemma: "give up",
	inherentFeatures: {
		phrasal: "Yes",
	},
	language: "English",
	lemmaKind: "Lexeme",
	meaningInEmojis: "🏳️",
	pos: "VERB",
} as const;

// Attestation: "They [walk] home together."
export const englishWalkInflectionSurface = {
	inflectionalFeatures: {
		tense: "Pres",
		verbForm: "Fin",
	},
	language: "English",
	normalizedFullSurface: "walk",
	surfaceKind: "Inflection",
	lemma: englishWalkLemma,
} satisfies Surface<
	"English",
	"Inflection",
	"Lexeme",
	"VERB"
>;

// Attestation: "They [walk] home together."
export const englishWalkLemmaSurface = {
	language: "English",
	normalizedFullSurface: "walk",
	surfaceKind: "Lemma",
	lemma: englishWalkLemma,
} satisfies Surface<"English", "Lemma", "Lexeme", "VERB">;

// Attestation: "Mark gvae [up] on it."
export const englishGiveUpTypoInflectionSurface = {
	inflectionalFeatures: {
		tense: "Past",
		verbForm: "Fin",
	},
	language: "English",
	normalizedFullSurface: "gave up",
	surfaceKind: "Inflection",
	lemma: englishGiveUpLemma,
} satisfies Surface<
	"English",
	"Inflection",
	"Lexeme",
	"VERB"
>;
