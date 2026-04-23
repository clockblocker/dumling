import type { Selection } from "dumling/types";

export const bioRootPartialSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "bio",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "bio",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "bio",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Root",
			inherentFeatures: {},
			meaningInEmojis: "🧬",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Morpheme", "Root">;

export const attestation = {
	order: 145,
	selection: bioRootPartialSelection,
	sentenceMarkdown: "The **bio**reactor failed overnight.",
} as const;
