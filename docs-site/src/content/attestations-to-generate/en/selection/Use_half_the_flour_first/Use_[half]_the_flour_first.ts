import type { AttestedSelection, Selection } from "dumling/types";

export const halfDeterminerFractionSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "half",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "half",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "half",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				numForm: "Word",
				numType: "Frac",
			},
			meaningInEmojis: "½",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "DET">;

export const attestation = {
	selection: halfDeterminerFractionSelection,
	sentenceMarkdown: "Use [half] the flour first.",
	classifierNotes: "Half before a noun phrase is DET with fractional number features, not NUM.",
} as const satisfies AttestedSelection;
