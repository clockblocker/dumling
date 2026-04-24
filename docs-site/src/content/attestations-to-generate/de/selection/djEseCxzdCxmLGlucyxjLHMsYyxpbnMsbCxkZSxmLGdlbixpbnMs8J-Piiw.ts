import type { Selection } from "dumling/types";

export const deSelection040 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ins",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "ins",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "ins",
			lemmaKind: "Fusion",
			lemmaSubKind: "General",
			inherentFeatures: {},
			meaningInEmojis: "🏊",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Fusion", "General">;

export const attestation = {
	order: 239,
	selection: deSelection040,
	sentenceMarkdown: "Sie sprang **ins** kalte Wasser.",
	title: "Ins: fusion",
} as const;
