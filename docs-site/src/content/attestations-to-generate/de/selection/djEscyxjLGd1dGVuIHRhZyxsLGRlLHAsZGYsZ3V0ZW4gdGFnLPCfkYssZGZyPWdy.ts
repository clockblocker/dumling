import type { Selection } from "dumling/types";

export const deSelection048 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Guten Tag",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Guten Tag",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Guten Tag",
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: "Greeting",
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
	order: 247,
	selection: deSelection048,
	sentenceMarkdown: "**Guten Tag**, ich habe einen Termin.",
	title: "Guten Tag discourse formula",
} as const;
