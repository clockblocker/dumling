import type { AttestedSelection, Selection } from "dumling/types";

export const windNounHomographSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "wind",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "wind",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "wind",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "💨",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: windNounHomographSelection,
	sentenceMarkdown: "The [wind] shifted before dawn.",
} as const satisfies AttestedSelection;
