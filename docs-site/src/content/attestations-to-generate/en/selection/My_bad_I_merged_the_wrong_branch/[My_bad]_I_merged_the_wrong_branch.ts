import type { AttestedSelection, Selection } from "dumling/types";

const myBadFormulaSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "My bad",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "my bad",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "my bad",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: "Apology",
			},
			meaningInEmojis: "🙏",
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
	selection: myBadFormulaSelection,
	sentenceMarkdown: "[My bad], I merged the wrong branch.",
	classifierNotes: "My bad is categorized by discourse function Apology, not by the adjective bad.",
} as const satisfies AttestedSelection;
