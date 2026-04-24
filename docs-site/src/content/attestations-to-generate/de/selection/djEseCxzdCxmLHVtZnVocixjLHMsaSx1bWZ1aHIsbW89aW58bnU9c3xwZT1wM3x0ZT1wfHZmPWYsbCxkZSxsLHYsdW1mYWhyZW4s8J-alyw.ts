import type { Selection } from "dumling/types";

export const deSelection016 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "umfuhr",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "umfuhr",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Ind",
			number: "Sing",
			person: "3",
			tense: "Past",
			verbForm: "Fin",
		},
		lemma: {
			language: "de",
			canonicalLemma: "umfahren",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "🚗",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	order: 215,
	selection: deSelection016,
	sentenceMarkdown: "Sie **umfuhr** die Baustelle weiträumig.",
	title: "Umfuhr: inseparable umfahren",
} as const;
