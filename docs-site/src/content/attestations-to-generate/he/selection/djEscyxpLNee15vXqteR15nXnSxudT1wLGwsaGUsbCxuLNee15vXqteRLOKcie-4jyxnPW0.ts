import type { Selection } from "dumling/types";

export const michtavimNounSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "מכתבים",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "מכתבים",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Plur",
		},
		lemma: {
			language: "he",
			canonicalLemma: "מכתב",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "✉️",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	order: 124,
	selection: michtavimNounSelection,
	sentenceMarkdown: "מצאתי **מכתבים** ישנים.",
} as const;
