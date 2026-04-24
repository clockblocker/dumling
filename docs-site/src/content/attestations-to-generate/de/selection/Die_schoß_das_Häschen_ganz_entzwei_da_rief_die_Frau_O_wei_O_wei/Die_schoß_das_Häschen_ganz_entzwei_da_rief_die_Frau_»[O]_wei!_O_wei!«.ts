import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "O",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "o wei",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "o wei",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: "Reaction",
			},
			meaningInEmojis: "😱",
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
	selection: deSelection,
	sentenceMarkdown: `Die schoß das Häschen ganz entzwei;
da rief die Frau: »[O] wei! O wei!«`,
	classifierNotes:
		"I linked the selected O to the whole exclamation o wei as a discourse formula, not to a standalone interjection token. That follows the dumling preference for preserving the meaning-bearing multiword formula when a learner highlights only one part of it.",
} as const satisfies AttestedSelection;
