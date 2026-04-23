import type { Selection } from "dumling/types";

export const bestAdverbSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "best",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "best",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			degree: "Sup",
		},
		lemma: {
			language: "en",
			canonicalLemma: "well",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADV",
			inherentFeatures: {},
			meaningInEmojis: "🎯",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "ADV">;

export const attestation = {
	order: 111,
	selection: bestAdverbSelection,
	sentenceMarkdown: "She performed **best** under pressure.",
} as const;
