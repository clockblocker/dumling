import type { AttestedSelection, Selection } from "dumling/types";

export const haDeterminerSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ה",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ה",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "ה",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				pronType: "Art",
			},
			meaningInEmojis: "🔎",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "DET">;

export const attestation = {
	selection: haDeterminerSelection,
	sentenceMarkdown: "[ה]בית פתוח.",
	title: haDeterminerSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
