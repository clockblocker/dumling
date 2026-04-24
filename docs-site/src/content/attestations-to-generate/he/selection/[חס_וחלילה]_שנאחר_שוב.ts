import type { AttestedSelection, Selection } from "dumling/types";

export const chasVechalilaIdiomSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "חס וחלילה",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "חס וחלילה",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "חס וחלילה",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "🚫",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	selection: chasVechalilaIdiomSelection,
	sentenceMarkdown: "[חס וחלילה] שנאחר שוב.",
	title: chasVechalilaIdiomSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
