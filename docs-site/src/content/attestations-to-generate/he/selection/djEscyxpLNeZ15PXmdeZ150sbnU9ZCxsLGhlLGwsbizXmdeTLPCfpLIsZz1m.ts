import type { Selection } from "dumling/types";

export const yadayimDualSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ידיים",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ידיים",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Dual",
		},
		lemma: {
			language: "he",
			canonicalLemma: "יד",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "🤲",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	order: 126,
	selection: yadayimDualSelection,
	sentenceMarkdown: "רחצתי **ידיים**.",
} as const;
