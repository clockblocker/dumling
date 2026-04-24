import type { AttestedSelection, Selection } from "dumling/types";

export const shePrefixSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ש",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ש",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "ש",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Prefix",
			inherentFeatures: {},
			meaningInEmojis: "🔗",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Morpheme", "Prefix">;

export const attestation = {
	selection: shePrefixSelection,
	sentenceMarkdown: "אמרת [ש]תבוא.",
	classifierNotes: "ש is modeled as the bound complementizer or relative-marker prefix morpheme.",
} as const satisfies AttestedSelection;
