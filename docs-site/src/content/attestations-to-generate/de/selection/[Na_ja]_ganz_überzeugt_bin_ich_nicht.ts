import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection047 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Na ja",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "na ja",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "na ja",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: "Reaction",
			},
			meaningInEmojis: "🤷",
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
	selection: deSelection047,
	sentenceMarkdown: "[Na ja], ganz überzeugt bin ich nicht.",
} as const satisfies AttestedSelection;
