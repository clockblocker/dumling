import type { AttestedSelection, Selection } from "dumling/types";

export const maNishmaFormulaSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "מה נשמע",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "מה נשמע",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "מה נשמע",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {},
			meaningInEmojis: "💬",
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
	selection: maNishmaFormulaSelection,
	sentenceMarkdown: "[מה נשמע] אצלכם?",
} as const satisfies AttestedSelection;
