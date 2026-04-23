import type { Selection } from "dumling/types";

export const wereSubjunctiveAuxSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "were",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "were",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Sub",
			tense: "Past",
			verbForm: "Fin",
		},
		lemma: {
			language: "en",
			canonicalLemma: "be",
			lemmaKind: "Lexeme",
			lemmaSubKind: "AUX",
			inherentFeatures: {},
			meaningInEmojis: "🧩",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "AUX">;

export const attestation = {
	order: 112,
	selection: wereSubjunctiveAuxSelection,
	sentenceMarkdown: "If I **were** you, I would wait.",
} as const;
