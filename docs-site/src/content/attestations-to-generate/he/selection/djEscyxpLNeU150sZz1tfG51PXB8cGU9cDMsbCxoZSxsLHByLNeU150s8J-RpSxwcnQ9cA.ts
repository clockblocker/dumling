import type { Selection } from "dumling/types";

export const hemPronounSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "הם",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "הם",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Masc",
			number: "Plur",
			person: "3",
		},
		lemma: {
			language: "he",
			canonicalLemma: "הם",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				pronType: "Prs",
			},
			meaningInEmojis: "👥",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "PRON">;

export const attestation = {
	order: 134,
	selection: hemPronounSelection,
	sentenceMarkdown: "**הם** הגיעו בזמן.",
} as const;
