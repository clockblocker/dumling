import type { Selection } from "dumling/types";

export const seeYouLaterFormulaPartialSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "See",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "see you later",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "see you later",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: "Farewell",
			},
			meaningInEmojis: "👋",
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
	order: 139,
	selection: seeYouLaterFormulaPartialSelection,
	sentenceMarkdown: "**See** you later at the station.",
} as const;
