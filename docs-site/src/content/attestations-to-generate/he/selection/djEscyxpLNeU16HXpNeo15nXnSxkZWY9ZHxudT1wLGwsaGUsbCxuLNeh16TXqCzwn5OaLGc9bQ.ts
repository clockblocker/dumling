import type { Selection } from "dumling/types";

export const hasfarimSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "הספרים",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "הספרים",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			definite: "Def",
			number: "Plur",
		},
		lemma: {
			language: "he",
			canonicalLemma: "ספר",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "📚",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	order: 128,
	selection: hasfarimSelection,
	sentenceMarkdown: "**הספרים** על השולחן.",
} as const;
