import type { Selection } from "dumling/types";

export const ochelNounSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "אוכל",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "אוכל",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "אוכל",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🍲",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	order: 144,
	selection: ochelNounSelection,
	sentenceMarkdown: "ה**אוכל** כבר מוכן.",
} as const;
