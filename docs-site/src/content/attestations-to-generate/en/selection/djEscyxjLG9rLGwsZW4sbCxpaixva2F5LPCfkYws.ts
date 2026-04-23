import type { Selection } from "dumling/types";

export const okVariantSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "OK",
	spellingRelation: "Variant",
	surface: {
		language: "en",
		normalizedFullSurface: "OK",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "okay",
			lemmaKind: "Lexeme",
			lemmaSubKind: "INTJ",
			inherentFeatures: {},
			meaningInEmojis: "👌",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "INTJ">;

export const attestation = {
	order: 127,
	selection: okVariantSelection,
	sentenceMarkdown: "Is **OK** still acceptable here?",
} as const;
