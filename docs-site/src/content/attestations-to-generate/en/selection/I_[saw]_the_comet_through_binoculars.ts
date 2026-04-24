import type { AttestedSelection, Selection } from "dumling/types";

export const sawVerbPastSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "saw",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "saw",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			tense: "Past",
			verbForm: "Fin",
		},
		lemma: {
			language: "en",
			canonicalLemma: "see",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "👀",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: sawVerbPastSelection,
	sentenceMarkdown: "I [saw] the comet through binoculars.",
} as const satisfies AttestedSelection;
