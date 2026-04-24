import type { AttestedSelection, Selection } from "dumling/types";

const hasfarimSelection = {
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
	selection: hasfarimSelection,
	sentenceMarkdown: "[הספרים] על השולחן.",
	classifierNotes: "This is a full selection of a definite plural noun surface.",
} as const satisfies AttestedSelection;
