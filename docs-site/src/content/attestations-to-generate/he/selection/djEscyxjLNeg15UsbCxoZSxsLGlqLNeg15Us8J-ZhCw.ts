import type { Selection } from "dumling/types";

export const nuInterjectionSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "נו",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "נו",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "נו",
			lemmaKind: "Lexeme",
			lemmaSubKind: "INTJ",
			inherentFeatures: {},
			meaningInEmojis: "🙄",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "INTJ">;

export const attestation = {
	order: 104,
	selection: nuInterjectionSelection,
	sentenceMarkdown: "**נו**, תספר כבר.",
} as const;
