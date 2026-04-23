import type { Selection } from "dumling/types";

export const gdolaAdjectiveSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "גדולה",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "גדולה",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Fem",
			number: "Sing",
		},
		lemma: {
			language: "he",
			canonicalLemma: "גדול",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "📏",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "ADJ">;

export const attestation = {
	order: 129,
	selection: gdolaAdjectiveSelection,
	sentenceMarkdown: "זו טעות **גדולה**.",
} as const;
