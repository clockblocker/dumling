import type { Selection } from "dumling/types";

export const alHapanimIdiomSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "פנים",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "על הפנים",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "על הפנים",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "😖",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	order: 106,
	selection: alHapanimIdiomSelection,
	sentenceMarkdown: "הראיון היה על ה**פנים**.",
} as const;
