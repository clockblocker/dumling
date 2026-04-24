import type { Selection } from "dumling/types";

export const deSelection046 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Morgenstund",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Morgenstund hat Gold im Mund",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Morgenstund hat Gold im Mund",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Proverb",
			inherentFeatures: {},
			meaningInEmojis: "🌅",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Phraseme", "Proverb">;

export const attestation = {
	order: 245,
	selection: deSelection046,
	sentenceMarkdown:
		"**Morgenstund** hat Gold im Mund, sagte sie verschlafen.",
	title: "Morgenstund proverb",
} as const;
