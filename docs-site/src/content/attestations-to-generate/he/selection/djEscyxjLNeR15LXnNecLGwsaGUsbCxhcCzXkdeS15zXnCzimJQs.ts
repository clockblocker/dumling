import type { Selection } from "dumling/types";

export const biglalAdpositionSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "בגלל",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "בגלל",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "בגלל",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {},
			meaningInEmojis: "☔",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	order: 112,
	selection: biglalAdpositionSelection,
	sentenceMarkdown: "נשארנו בבית **בגלל** הגשם.",
} as const;
