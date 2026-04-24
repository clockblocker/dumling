import type { AttestedSelection, Selection } from "dumling/types";

export const readPastHomographSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "read",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "read",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			tense: "Past",
			verbForm: "Fin",
		},
		lemma: {
			language: "en",
			canonicalLemma: "read",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "📖",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: readPastHomographSelection,
	sentenceMarkdown: "Yesterday I [read] the warning twice.",
} as const satisfies AttestedSelection;
