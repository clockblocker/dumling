import type { AttestedSelection, Selection } from "dumling/types";

export const hatovotAdjectiveSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "הטובות",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "הטובות",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			definite: "Def",
			gender: "Fem",
			number: "Plur",
		},
		lemma: {
			language: "he",
			canonicalLemma: "טוב",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "👍",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "ADJ">;

export const attestation = {
	selection: hatovotAdjectiveSelection,
	sentenceMarkdown: "השאלות [הטובות] נשארו לסוף.",
	title: hatovotAdjectiveSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
