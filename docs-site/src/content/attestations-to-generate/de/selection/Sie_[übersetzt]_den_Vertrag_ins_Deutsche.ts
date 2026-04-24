import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection018 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "übersetzt",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "übersetzt",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Ind",
			number: "Sing",
			person: "3",
			tense: "Pres",
			verbForm: "Fin",
		},
		lemma: {
			language: "de",
			canonicalLemma: "übersetzen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "🌐",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection018,
	sentenceMarkdown: "Sie [übersetzt] den Vertrag ins Deutsche.",
	classifierNotes: "The ambiguous surface übersetzt is taken as present finite, not as a participle.",
} as const satisfies AttestedSelection;
