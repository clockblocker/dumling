import type { Selection } from "dumling/types";

export const betterAdjectiveSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "better",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "better",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			degree: "Cmp",
		},
		lemma: {
			language: "en",
			canonicalLemma: "good",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "👍",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "ADJ">;

export const attestation = {
	order: 110,
	selection: betterAdjectiveSelection,
	sentenceMarkdown: "This is the **better** option.",
} as const;
