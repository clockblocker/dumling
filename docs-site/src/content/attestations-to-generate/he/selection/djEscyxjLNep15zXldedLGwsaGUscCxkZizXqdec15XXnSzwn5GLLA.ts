import type { Selection } from "dumling/types";

export const shalomFormulaSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "שלום",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "שלום",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "שלום",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {},
			meaningInEmojis: "👋",
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
	order: 100,
	selection: shalomFormulaSelection,
	sentenceMarkdown: "**שלום**, מה שלומך?",
} as const;
