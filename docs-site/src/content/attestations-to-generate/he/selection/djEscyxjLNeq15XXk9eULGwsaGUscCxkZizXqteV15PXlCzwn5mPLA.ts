import type { Selection } from "dumling/types";

export const todaFormulaSelection = {
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
	order: 101,
	selection: todaFormulaSelection,
	sentenceMarkdown: "**תודה** על העזרה.",
} as const;
