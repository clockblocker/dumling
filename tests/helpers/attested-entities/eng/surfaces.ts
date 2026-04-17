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
	discriminators: {
		lemmaKind: "Lexeme",
		lemmaSubKind: "VERB",
	},
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
	"Standard",
	"Inflection",
	"Lexeme",
	"VERB"
>;

// Attestation: "They [walk] home together."
export const englishWalkLemmaSurface = {
	discriminators: {
		lemmaKind: "Lexeme",
		lemmaSubKind: "VERB",
	},
	language: "English",
	normalizedFullSurface: "walk",
	surfaceKind: "Lemma",
	lemma: englishWalkLemma,
} satisfies Surface<"English", "Standard", "Lemma", "Lexeme", "VERB">;

// Attestation: "Mark gvae [up] on it."
export const englishGiveUpTypoInflectionSurface = {
	discriminators: {
		lemmaKind: "Lexeme",
		lemmaSubKind: "VERB",
	},
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
	"Typo",
	"Inflection",
	"Lexeme",
	"VERB"
>;
