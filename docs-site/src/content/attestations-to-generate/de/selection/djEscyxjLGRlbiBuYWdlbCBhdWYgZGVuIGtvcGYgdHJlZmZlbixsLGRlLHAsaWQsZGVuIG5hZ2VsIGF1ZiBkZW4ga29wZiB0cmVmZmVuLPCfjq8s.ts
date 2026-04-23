import type { Selection } from "dumling/types";

export const deSelection045 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Nagel",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "den Nagel auf den Kopf treffen",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "den Nagel auf den Kopf treffen",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "🎯",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	order: 244,
	selection: deSelection045,
	sentenceMarkdown: "Damit triffst du den **Nagel** auf den Kopf.",
	title: "Nagel in idiom",
} as const;
