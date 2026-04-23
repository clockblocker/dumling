import type { Selection } from "dumling/types";

export const yeshExistentialSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "יש",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "יש",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "יש",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hebExistential: "Yes",
			},
			meaningInEmojis: "✅",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "VERB">;

export const attestation = {
	order: 141,
	selection: yeshExistentialSelection,
	sentenceMarkdown: "**יש** קפה במטבח.",
} as const;
