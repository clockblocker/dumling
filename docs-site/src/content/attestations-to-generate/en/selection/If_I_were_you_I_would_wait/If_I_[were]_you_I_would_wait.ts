import type { AttestedSelection, Selection } from "dumling/types";

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
	selection: wereSubjunctiveAuxSelection,
	sentenceMarkdown: "If I [were] you, I would wait.",
	classifierNotes: "Were in if I were you is AUX with Mood=Sub; the schema allows mood without forcing person or number.",
} as const satisfies AttestedSelection;
