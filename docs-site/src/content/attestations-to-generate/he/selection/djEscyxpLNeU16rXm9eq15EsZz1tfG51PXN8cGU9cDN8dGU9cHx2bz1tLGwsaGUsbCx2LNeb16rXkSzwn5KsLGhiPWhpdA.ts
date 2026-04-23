import type { Selection } from "dumling/types";

export const hitkatevVerbSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "התכתב",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "התכתב",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Masc",
			number: "Sing",
			person: "3",
			tense: "Past",
			voice: "Mid",
		},
		lemma: {
			language: "he",
			canonicalLemma: "כתב",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hebBinyan: "HITPAEL",
			},
			meaningInEmojis: "💬",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	order: 123,
	selection: hitkatevVerbSelection,
	sentenceMarkdown: "הוא **התכתב** עם המרצה.",
} as const;
