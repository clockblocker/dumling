import type { AttestedSelection, Selection } from "dumling/types";

export const bateiConstructSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "בתי",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "בתי",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			definite: "Cons",
			number: "Plur",
		},
		lemma: {
			language: "he",
			canonicalLemma: "בית",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🏠",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	selection: bateiConstructSelection,
	sentenceMarkdown: "[בתי] הספר נסגרו מוקדם.",
} as const satisfies AttestedSelection;
