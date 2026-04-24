import type { AttestedSelection, Selection } from "dumling/types";

export const noWorriesFormulaSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "No worries",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "no worries",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "no worries",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: "Acknowledgment",
			},
			meaningInEmojis: "🙂",
		},
	},
} satisfies Selection<
	"en",
	"Standard",
	"Citation",
	"Phraseme",
	"DiscourseFormula"
>;

export const attestation = {
	selection: noWorriesFormulaSelection,
	sentenceMarkdown: "[No worries], I already fixed it.",
	classifierNotes: "No worries is a discourse formula rather than compositional negation plus noun.",
} as const satisfies AttestedSelection;
