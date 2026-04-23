import type { Selection } from "dumling/types";

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
	order: 217,
	selection: deSelection018,
	sentenceMarkdown: "Sie **übersetzt** den Vertrag ins Deutsche.",
	title: "Übersetzt: finite translate",
} as const;
