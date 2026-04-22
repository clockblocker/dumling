import type { Selection } from "dumling/types";

export const walkSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "walk",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "walk",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "🚶",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	order: 35,
	selection: walkSelection,
	sentenceMarkdown: "During my **walk** in a park, I saw a squirrel.",
} as const;
