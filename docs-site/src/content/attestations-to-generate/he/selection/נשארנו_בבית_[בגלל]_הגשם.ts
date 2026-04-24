import type { AttestedSelection, Selection } from "dumling/types";

export const biglalAdpositionSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "בגלל",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "בגלל",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "בגלל",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {},
			meaningInEmojis: "☔",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	selection: biglalAdpositionSelection,
	sentenceMarkdown: "נשארנו בבית [בגלל] הגשם.",
	title: biglalAdpositionSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
