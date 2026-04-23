import type { Selection } from "dumling/types";

export const telAvivSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "תל אביב",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "תל אביב",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "תל אביב",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PROPN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "🌆",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "PROPN">;

export const attestation = {
	order: 139,
	selection: telAvivSelection,
	sentenceMarkdown: "עברתי ל**תל אביב**.",
} as const;
