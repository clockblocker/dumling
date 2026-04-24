import type { AttestedSelection, Selection } from "dumling/types";

export const smithsPluralProperNounSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Smiths",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "Smiths",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Plur",
		},
		lemma: {
			language: "en",
			canonicalLemma: "Smith",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PROPN",
			inherentFeatures: {},
			meaningInEmojis: "👨‍👩‍👧‍👦",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "PROPN">;

export const attestation = {
	selection: smithsPluralProperNounSelection,
	sentenceMarkdown: "The [Smiths] invited everyone over.",
	title: smithsPluralProperNounSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
