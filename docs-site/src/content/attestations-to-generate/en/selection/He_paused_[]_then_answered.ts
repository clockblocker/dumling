import type { AttestedSelection, Selection } from "dumling/types";

export const ellipsisPunctuationSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "...",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "...",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "...",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PUNCT",
			inherentFeatures: {},
			meaningInEmojis: "…",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "PUNCT">;

export const attestation = {
	selection: ellipsisPunctuationSelection,
	sentenceMarkdown: "He paused [...] then answered.",
} as const satisfies AttestedSelection;
