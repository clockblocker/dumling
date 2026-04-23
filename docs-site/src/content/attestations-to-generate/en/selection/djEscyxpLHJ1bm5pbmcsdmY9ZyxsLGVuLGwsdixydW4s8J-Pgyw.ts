import type { Selection } from "dumling/types";

export const runningGerundSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Running",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "running",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			verbForm: "Ger",
		},
		lemma: {
			language: "en",
			canonicalLemma: "run",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "🏃",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	order: 115,
	selection: runningGerundSelection,
	sentenceMarkdown: "**Running** before breakfast clears my head.",
} as const;
