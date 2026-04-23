import type { Selection } from "dumling/types";

export const tafastaMerubeSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "תפסת",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "תפסת מרובה לא תפסת",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "תפסת מרובה לא תפסת",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Proverb",
			inherentFeatures: {},
			meaningInEmojis: "⚖️",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Phraseme", "Proverb">;

export const attestation = {
	order: 108,
	selection: tafastaMerubeSelection,
	sentenceMarkdown: "**תפסת** מרובה לא תפסת.",
} as const;
