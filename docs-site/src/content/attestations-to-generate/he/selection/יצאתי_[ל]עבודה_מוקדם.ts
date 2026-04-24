import type { AttestedSelection, Selection } from "dumling/types";

export const lePrefixSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ל",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ל",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "ל",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Prefix",
			inherentFeatures: {},
			meaningInEmojis: "➡️",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Morpheme", "Prefix">;

export const attestation = {
	selection: lePrefixSelection,
	sentenceMarkdown: "יצאתי [ל]עבודה מוקדם.",
	classifierNotes: "ל is treated as a prefix morpheme, not a full adposition lexeme, because it is selected inside an attached form.",
} as const satisfies AttestedSelection;
