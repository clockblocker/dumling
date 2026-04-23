import type { Selection } from "dumling/types";

export const deSelection049 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "tut mir leid",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "tut mir leid",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "tut mir leid",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: "Apology",
			},
			meaningInEmojis: "🙇",
		},
	},
} satisfies Selection<
	"de",
	"Standard",
	"Citation",
	"Phraseme",
	"DiscourseFormula"
>;

export const attestation = {
	order: 248,
	selection: deSelection049,
	sentenceMarkdown: "**Tut mir leid**, das war mein Fehler.",
	title: "Tut mir leid discourse formula",
} as const;
