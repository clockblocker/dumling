import type { AttestedSelection, Selection } from "dumling/types";

export const accommodationTypoPartialSelection = {
	language: "en",
	orthographicStatus: "Typo",
	selectionCoverage: "Full",
	spelledSelection: "acommodation",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "accommodation",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "accommodation",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "🏨",
		},
	},
} satisfies Selection<"en", "Typo", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: accommodationTypoPartialSelection,
	sentenceMarkdown: "The sign advertised [acommodation] nearby.",
} as const satisfies AttestedSelection;
