import type { AttestedSelection, Selection } from "dumling/types";

const thatPronounSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "That",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "that",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "that",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				pronType: "Dem",
			},
			meaningInEmojis: "👉",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "PRON">;

export const attestation = {
	selection: thatPronounSelection,
	sentenceMarkdown: "[That] was unexpected.",
	classifierNotes: "Standalone that is PRON; it shares its surface spelling with the DET and SCONJ examples.",
} as const satisfies AttestedSelection;
