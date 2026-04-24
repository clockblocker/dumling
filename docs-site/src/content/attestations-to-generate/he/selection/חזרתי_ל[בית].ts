import type { AttestedSelection, Selection } from "dumling/types";

export const habayitPartialSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "בית",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "הבית",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			definite: "Def",
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
	selection: habayitPartialSelection,
	sentenceMarkdown: "חזרתי ל[בית].",
} as const satisfies AttestedSelection;
