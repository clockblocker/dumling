import type { AttestedSelection, Selection } from "dumling/types";

export const sawNounSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "saw",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "saw",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "saw",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "🪚",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: sawNounSelection,
	sentenceMarkdown: "The [saw] needs a new blade.",
	classifierNotes: "Tool saw is a noun citation surface; the model can keep it distinct from the verb surface saw.",
} as const satisfies AttestedSelection;
