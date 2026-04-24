import type { AttestedSelection, Selection } from "dumling/types";

export const boUImperativeSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "בואו",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "בואו",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Imp",
			number: "Plur",
			person: "2",
		},
		lemma: {
			language: "he",
			canonicalLemma: "בוא",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hebBinyan: "PAAL",
			},
			meaningInEmojis: "👋",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: boUImperativeSelection,
	sentenceMarkdown: "[בואו] לכאן.",
	classifierNotes: "בואו is an imperative plural form with mood Imp and no tense.",
} as const satisfies AttestedSelection;
