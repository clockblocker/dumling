import type { AttestedSelection, Selection } from "dumling/types";

const telechNegativeSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "תלך",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "תלך",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Masc",
			number: "Sing",
			person: "2",
			polarity: "Neg",
			tense: "Fut",
		},
		lemma: {
			language: "he",
			canonicalLemma: "הלך",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hebBinyan: "PAAL",
			},
			meaningInEmojis: "🚶",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: telechNegativeSelection,
	sentenceMarkdown: "אל [תלך] לבד.",
	classifierNotes: "The verb carries polarity Neg because the negative-command context matters even though אל is separate.",
} as const satisfies AttestedSelection;
