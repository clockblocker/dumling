import type { Selection } from "dumling/types";

export const llCliticPartialSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "ll",
	spellingRelation: "Variant",
	surface: {
		language: "en",
		normalizedFullSurface: "ll",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "'ll",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Clitic",
			inherentFeatures: {},
			meaningInEmojis: "🔮",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Morpheme", "Clitic">;

export const attestation = {
	order: 144,
	selection: llCliticPartialSelection,
	sentenceMarkdown: "I'**ll** call when I arrive.",
} as const;
