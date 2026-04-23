import type { Selection } from "dumling/types";

export const shteiNumeralSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "שתי",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "שתי",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			definite: "Cons",
			gender: "Fem",
			number: "Dual",
		},
		lemma: {
			language: "he",
			canonicalLemma: "שתיים",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NUM",
			inherentFeatures: {},
			meaningInEmojis: "2️⃣",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "NUM">;

export const attestation = {
	order: 136,
	selection: shteiNumeralSelection,
	sentenceMarkdown: "קניתי **שתי** מחברות.",
} as const;
