import type { AttestedSelection, Selection } from "dumling/types";

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
	selection: shteiNumeralSelection,
	sentenceMarkdown: "קניתי [שתי] מחברות.",
} as const satisfies AttestedSelection;
