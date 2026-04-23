import type { Selection } from "dumling/types";

export const bePrefixSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ב",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ב",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "ב",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Prefix",
			inherentFeatures: {},
			meaningInEmojis: "📍",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Morpheme", "Prefix">;

export const attestation = {
	order: 116,
	selection: bePrefixSelection,
	sentenceMarkdown: "הם נפגשו **ב**בית.",
} as const;
