import type { AttestedSelection, Selection } from "dumling/types";

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
	selection: lessIsMoreAphorismSelection,
	sentenceMarkdown: "For this layout, [less is more].",
	title: lessIsMoreAphorismSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
