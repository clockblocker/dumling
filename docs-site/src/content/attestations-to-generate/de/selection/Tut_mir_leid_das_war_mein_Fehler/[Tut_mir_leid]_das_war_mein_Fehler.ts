import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection049 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Tut mir leid",
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
	selection: deSelection049,
	sentenceMarkdown: "[Tut mir leid], das war mein Fehler.",
	classifierNotes: "Tut mir leid is stored as an apology phraseme, not as a literal finite-verb selection.",
} as const satisfies AttestedSelection;
