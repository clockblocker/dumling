import type { Selection } from "dumling/types";

export const deSelection050 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Un",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "un-",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "un-",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Prefix",
			inherentFeatures: {},
			meaningInEmojis: "🚫",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Morpheme", "Prefix">;

export const attestation = {
	order: 249,
	selection: deSelection050,
	sentenceMarkdown: "Das **Un**- in Unkosten wirkt historisch irritierend.",
	title: "Un- prefix",
} as const;
