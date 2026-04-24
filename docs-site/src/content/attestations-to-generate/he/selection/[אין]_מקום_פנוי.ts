import type { AttestedSelection, Selection } from "dumling/types";

export const einExistentialSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "אין",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "אין",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "אין",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hebExistential: "Yes",
			},
			meaningInEmojis: "❌",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "VERB">;

export const attestation = {
	selection: einExistentialSelection,
	sentenceMarkdown: "[אין] מקום פנוי.",
	title: einExistentialSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
