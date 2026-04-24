import type { AttestedSelection, Selection } from "dumling/types";

export const whosePronounPossessiveSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Whose",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "whose",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Gen",
		},
		lemma: {
			language: "en",
			canonicalLemma: "who",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				poss: "Yes",
				pronType: "Int",
			},
			meaningInEmojis: "❔",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "PRON">;

export const attestation = {
	selection: whosePronounPossessiveSelection,
	sentenceMarkdown: "[Whose] keys are these?",
	classifierNotes: "Whose is attached to who with possessive and interrogative inherent features plus genitive surface case.",
} as const satisfies AttestedSelection;
