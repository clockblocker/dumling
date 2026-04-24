import type { AttestedSelection, Selection } from "dumling/types";

export const ishSuffixPartialSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "ish",
	spellingRelation: "Variant",
	surface: {
		language: "en",
		normalizedFullSurface: "-ish",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "-ish",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Suffix",
			inherentFeatures: {},
			meaningInEmojis: "~",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Morpheme", "Suffix">;

export const attestation = {
	selection: ishSuffixPartialSelection,
	sentenceMarkdown: "The estimate was thirty[ish] minutes.",
} as const satisfies AttestedSelection;
