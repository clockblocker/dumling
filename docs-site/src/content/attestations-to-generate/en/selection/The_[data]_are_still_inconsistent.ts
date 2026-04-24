import type { AttestedSelection, Selection } from "dumling/types";

export const dataPluralSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "data",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "data",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Plur",
		},
		lemma: {
			language: "en",
			canonicalLemma: "datum",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "📊",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	selection: dataPluralSelection,
	sentenceMarkdown: "The [data] are still inconsistent.",
	classifierNotes: "Data is treated as a plural inflection of datum, even though contemporary usage often treats data as mass or singular.",
} as const satisfies AttestedSelection;
