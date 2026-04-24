import type { AttestedSelection, Selection } from "dumling/types";

export const doesAuxSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Does",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "does",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Ind",
			number: "Sing",
			person: "3",
			tense: "Pres",
			verbForm: "Fin",
		},
		lemma: {
			language: "en",
			canonicalLemma: "do",
			lemmaKind: "Lexeme",
			lemmaSubKind: "AUX",
			inherentFeatures: {},
			meaningInEmojis: "❓",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "AUX">;

export const attestation = {
	selection: doesAuxSelection,
	sentenceMarkdown: "[Does] this key open the archive?",
	title: doesAuxSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
