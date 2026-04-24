import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "hinaus",
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
und lief [hinaus] ins Feld geschwind`,
	classifierNotes:
		"This follows the same separable-verb analysis as `[lief]`: the selected particle points to the full discontinuous verbal surface `lief hinaus` and lemma `hinauslaufen`, not to a standalone directional adverb entry.",
} as const satisfies AttestedSelection;
