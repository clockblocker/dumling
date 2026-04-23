import type { Selection } from "dumling/types";

export const thatSubordinatorSelection = {
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
			lemmaSubKind: "SCONJ",
			inherentFeatures: {},
			meaningInEmojis: "🔗",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "SCONJ">;

export const attestation = {
	order: 121,
	selection: thatSubordinatorSelection,
	sentenceMarkdown: "I know **that** you tried.",
} as const;
