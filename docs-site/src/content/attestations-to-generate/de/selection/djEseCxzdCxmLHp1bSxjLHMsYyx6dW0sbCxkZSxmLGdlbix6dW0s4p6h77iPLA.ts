import type { Selection } from "dumling/types";

export const deSelection039 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "zum",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "zum",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "zum",
			lemmaKind: "Fusion",
			lemmaSubKind: "General",
			inherentFeatures: {},
			meaningInEmojis: "➡️",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Fusion", "General">;

export const attestation = {
	order: 238,
	selection: deSelection039,
	sentenceMarkdown: "Er ging **zum** Bahnhof.",
	title: "Zum: fusion",
} as const;
