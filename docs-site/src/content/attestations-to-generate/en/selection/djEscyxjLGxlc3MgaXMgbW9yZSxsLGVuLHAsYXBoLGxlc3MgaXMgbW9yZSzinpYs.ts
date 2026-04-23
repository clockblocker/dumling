import type { Selection } from "dumling/types";

export const lessIsMoreAphorismSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "less is more",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "less is more",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "less is more",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Aphorism",
			inherentFeatures: {},
			meaningInEmojis: "➖",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Phraseme", "Aphorism">;

export const attestation = {
	order: 141,
	selection: lessIsMoreAphorismSelection,
	sentenceMarkdown: "For this layout, **less is more**.",
} as const;
