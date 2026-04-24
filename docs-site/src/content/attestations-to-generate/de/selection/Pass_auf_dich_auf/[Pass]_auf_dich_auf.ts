import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Pass",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "pass auf dich auf",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "pass auf dich auf",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: "Farewell",
			},
			meaningInEmojis: "👋",
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
	sentenceMarkdown: "[Pass] auf dich auf!",
	classifierNotes:
		"Only Pass is selected, but the intended attested unit is the full farewell formula pass auf dich auf.",
} as const satisfies AttestedSelection;
