import type { AttestedSelection, Selection } from "dumling/types";

export const bevakashaFormulaSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "בבקשה",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "בבקשה",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "בבקשה",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {},
			meaningInEmojis: "🤲",
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
	selection: bevakashaFormulaSelection,
	sentenceMarkdown: "אפשר מים, [בבקשה]?",
	title: bevakashaFormulaSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
