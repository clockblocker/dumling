import type { AttestedSelection, Selection } from "dumling/types";

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
	selection: bePrefixSelection,
	sentenceMarkdown: "הם נפגשו [ב]בית.",
	title: bePrefixSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
