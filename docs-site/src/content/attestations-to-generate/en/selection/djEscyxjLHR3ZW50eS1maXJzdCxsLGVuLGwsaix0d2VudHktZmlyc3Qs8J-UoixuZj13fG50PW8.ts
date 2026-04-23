import type { Selection } from "dumling/types";

export const twentyFirstAdjectiveOrdinalSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "twenty-first",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "twenty-first",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "twenty-first",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {
				numForm: "Word",
				numType: "Ord",
			},
			meaningInEmojis: "🔢",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "ADJ">;

export const attestation = {
	order: 149,
	selection: twentyFirstAdjectiveOrdinalSelection,
	sentenceMarkdown: "The **twenty-first** attempt finally passed.",
} as const;
