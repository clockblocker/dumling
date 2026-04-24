import type { AttestedSelection, Selection } from "dumling/types";

export const walkInTheParkSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "walk in the park",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "walk in the park",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "😌",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	selection: walkInTheParkSelection,
	sentenceMarkdown: "This exam was a [walk] in the park.",
} as const satisfies AttestedSelection;
