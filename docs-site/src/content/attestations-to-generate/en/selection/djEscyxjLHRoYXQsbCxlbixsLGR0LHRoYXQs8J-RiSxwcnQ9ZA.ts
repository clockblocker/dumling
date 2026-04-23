import type { Selection } from "dumling/types";

export const thatDeterminerSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "that",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "that",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "that",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				pronType: "Dem",
			},
			meaningInEmojis: "👉",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "DET">;

export const attestation = {
	order: 119,
	selection: thatDeterminerSelection,
	sentenceMarkdown: "Move **that** chair, please.",
} as const;
