import type { AttestedSelection, Selection } from "dumling/types";

export const gdolimAdjectiveSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "גדולים",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "גדולים",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Masc",
			number: "Plur",
		},
		lemma: {
			language: "he",
			canonicalLemma: "גדול",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "📏",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "ADJ">;

export const attestation = {
	selection: gdolimAdjectiveSelection,
	sentenceMarkdown: "החדרים [גדולים].",
} as const satisfies AttestedSelection;
