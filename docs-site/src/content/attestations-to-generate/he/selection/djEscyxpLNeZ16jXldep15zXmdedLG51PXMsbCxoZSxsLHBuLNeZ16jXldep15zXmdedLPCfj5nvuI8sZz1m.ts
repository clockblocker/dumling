import type { Selection } from "dumling/types";

export const yerushalayimSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ירושלים",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ירושלים",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Sing",
		},
		lemma: {
			language: "he",
			canonicalLemma: "ירושלים",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PROPN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "🏙️",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "PROPN">;

export const attestation = {
	order: 138,
	selection: yerushalayimSelection,
	sentenceMarkdown: "**ירושלים** יפה בלילה.",
} as const;
