import type { AttestedSelection, Selection } from "dumling/types";

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
	selection: bioRootPartialSelection,
	sentenceMarkdown: "The [bio]reactor failed overnight.",
} as const satisfies AttestedSelection;
