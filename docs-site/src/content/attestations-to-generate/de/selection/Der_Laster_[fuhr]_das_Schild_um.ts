import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection017 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "fuhr",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "fuhr um",
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
			inherentFeatures: {
				hasSepPrefix: "um",
			},
			meaningInEmojis: "💥",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection017,
	sentenceMarkdown: "Der Laster [fuhr] das Schild um.",
	title: "Fuhr um: separable umfahren",
} as const satisfies AttestedSelection;
