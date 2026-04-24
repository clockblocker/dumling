import type { Selection } from "dumling/types";

export const deSelection051 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "ge",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "ge-...-t",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "ge-...-t",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Circumfix",
			inherentFeatures: {},
			meaningInEmojis: "🧬",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Morpheme", "Circumfix">;

export const attestation = {
	order: 250,
	selection: deSelection051,
	sentenceMarkdown:
		"In **gelacht** markieren ge- und -t zusammen das Partizip.",
	title: "Ge-...-t circumfix",
} as const;
