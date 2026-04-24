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
	title: dataPluralSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
