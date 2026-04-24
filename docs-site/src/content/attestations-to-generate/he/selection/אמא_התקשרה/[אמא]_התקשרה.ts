import type { AttestedSelection, Selection } from "dumling/types";

export const imaVariantSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "אמא",
	spellingRelation: "Variant",
	surface: {
		language: "he",
		normalizedFullSurface: "אימא",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "אימא",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "👩",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: imaVariantSelection,
	sentenceMarkdown: "[אמא] התקשרה.",
	classifierNotes: "This captures an accepted spelling variant: selected spelling אמא, normalized surface אימא, spellingRelation Variant.",
} as const satisfies AttestedSelection;
