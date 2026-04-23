import type { Selection } from "dumling/types";

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
	order: 118,
	selection: whosePronounPossessiveSelection,
	sentenceMarkdown: "**Whose** keys are these?",
} as const;
