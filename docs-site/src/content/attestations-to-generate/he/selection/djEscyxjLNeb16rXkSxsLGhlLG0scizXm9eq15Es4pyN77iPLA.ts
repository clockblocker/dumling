import type { Selection } from "dumling/types";

export const ktvRootSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "כתב",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "כתב",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "כתב",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Root",
			inherentFeatures: {},
			meaningInEmojis: "✍️",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Morpheme", "Root">;

export const attestation = {
	order: 119,
	selection: ktvRootSelection,
	sentenceMarkdown: "במילה מ**כתב** רואים את השורש.",
} as const;
