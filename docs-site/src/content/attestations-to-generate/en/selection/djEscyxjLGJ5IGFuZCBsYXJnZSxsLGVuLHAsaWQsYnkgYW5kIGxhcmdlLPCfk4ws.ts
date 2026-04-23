import type { Selection } from "dumling/types";

export const byAndLargeIdiomSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "By and large",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "by and large",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "by and large",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "📌",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	order: 136,
	selection: byAndLargeIdiomSelection,
	sentenceMarkdown: "**By and large**, the migration worked.",
} as const;
