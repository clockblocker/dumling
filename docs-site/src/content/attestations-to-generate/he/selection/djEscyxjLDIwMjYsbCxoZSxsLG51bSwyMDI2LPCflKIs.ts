import type { Selection } from "dumling/types";

export const yearNumberSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "2026",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "2026",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "2026",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NUM",
			inherentFeatures: {},
			meaningInEmojis: "🔢",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "NUM">;

export const attestation = {
	order: 137,
	selection: yearNumberSelection,
	sentenceMarkdown: "הכנס נקבע ל-**2026**.",
} as const;
