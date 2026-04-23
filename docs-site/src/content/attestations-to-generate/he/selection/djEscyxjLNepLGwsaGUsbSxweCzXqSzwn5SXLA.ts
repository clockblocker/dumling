import type { Selection } from "dumling/types";

export const shePrefixSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ש",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ש",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "ש",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Prefix",
			inherentFeatures: {},
			meaningInEmojis: "🔗",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Morpheme", "Prefix">;

export const attestation = {
	order: 118,
	selection: shePrefixSelection,
	sentenceMarkdown: "אמרת **ש**תבוא.",
} as const;
