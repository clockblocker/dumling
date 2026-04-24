import type { AttestedSelection, Selection } from "dumling/types";

export const ochelNounSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "אוכל",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "אוכל",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "אוכל",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🍲",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: ochelNounSelection,
	sentenceMarkdown: "ה[אוכל] כבר מוכן.",
	classifierNotes: "אוכל is the noun food here, separated from the future-verb homograph by lemma and POS.",
} as const satisfies AttestedSelection;
