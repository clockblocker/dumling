import type { AttestedSelection, Selection } from "dumling/types";

export const eizeDeterminerSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "איזה",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "איזה",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Masc",
			number: "Sing",
		},
		lemma: {
			language: "he",
			canonicalLemma: "איזה",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				pronType: "Int",
			},
			meaningInEmojis: "❓",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "DET">;

export const attestation = {
	selection: eizeDeterminerSelection,
	sentenceMarkdown: "[איזה] רחוב זה?",
	classifierNotes: "איזה is an interrogative determiner rather than a pronoun because it modifies רחוב.",
} as const satisfies AttestedSelection;
