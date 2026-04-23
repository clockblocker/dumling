import type { Selection } from "dumling/types";

export const einChadashTachatSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "חדש",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "אין חדש תחת השמש",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "אין חדש תחת השמש",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Proverb",
			inherentFeatures: {},
			meaningInEmojis: "☀️",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Phraseme", "Proverb">;

export const attestation = {
	order: 109,
	selection: einChadashTachatSelection,
	sentenceMarkdown: "אין **חדש** תחת השמש.",
} as const;
