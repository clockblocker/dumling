import type { Selection } from "dumling/types";

export const minusSymbolSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "-",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "-",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "-",
			lemmaKind: "Lexeme",
			lemmaSubKind: "SYM",
			inherentFeatures: {},
			meaningInEmojis: "➖",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "SYM">;

export const attestation = {
	order: 124,
	selection: minusSymbolSelection,
	sentenceMarkdown: "The display flashed **-** before the number.",
} as const;
