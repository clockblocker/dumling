import type { AttestedSelection, Selection } from "dumling/types";

export const covidXTokenSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "COVID-ish",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "COVID-ish",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "COVID-ish",
			lemmaKind: "Lexeme",
			lemmaSubKind: "X",
			inherentFeatures: {
				foreign: "Yes",
			},
			meaningInEmojis: "🧪",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "X">;

export const attestation = {
	selection: covidXTokenSelection,
	sentenceMarkdown: "The report says [COVID-ish] twice.",
	title: covidXTokenSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
