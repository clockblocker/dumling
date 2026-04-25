import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "lief",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "lief hinaus",
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
			canonicalLemma: "hinauslaufen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hasSepPrefix: "hinaus",
			},
			meaningInEmojis: "🏃",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `nahm Ranzen, Pulverhorn und Flint
und [lief] hinaus ins Feld geschwind`,
	classifierNotes:
		"I treated this as a Partial selection of the separable verb `hinauslaufen`, with the full in-context surface `lief hinaus`. Plain `laufen` + free adverb is possible in principle, but Dumling usually prefers the larger meaning-bearing unit when the particle reads as the verb's separable prefix.",
} as const satisfies AttestedSelection;
