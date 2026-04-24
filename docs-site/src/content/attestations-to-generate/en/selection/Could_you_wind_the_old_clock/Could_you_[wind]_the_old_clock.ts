import type { AttestedSelection, Selection } from "dumling/types";

export const windVerbHomographSelection = {
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
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "🕰️",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "VERB">;

export const attestation = {
	selection: windVerbHomographSelection,
	sentenceMarkdown: "Could you [wind] the old clock?",
	classifierNotes: "Wind as a verb is modeled separately from wind as weather; pronunciation contrast is outside the object.",
} as const satisfies AttestedSelection;
