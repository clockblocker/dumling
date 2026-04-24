import type { AttestedSelection, Selection } from "dumling/types";

const todaFormulaSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "תודה",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "תודה",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "תודה",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {},
			meaningInEmojis: "🙏",
		},
	},
} satisfies Selection<
	"he",
	"Standard",
	"Citation",
	"Phraseme",
	"DiscourseFormula"
>;

export const attestation = {
	selection: todaFormulaSelection,
	sentenceMarkdown: "[תודה] על העזרה.",
	classifierNotes: "תודה is treated as a thanks formula rather than as a standalone noun.",
} as const satisfies AttestedSelection;
