import type { AttestedSelection, Selection } from "dumling/types";

const ishSuffixPartialSelection = {
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
	classifierNotes: "The suffix citation includes a leading hyphen, while the attested substring omits it.",
} as const satisfies AttestedSelection;
