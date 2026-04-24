import type { AttestedSelection, Selection } from "dumling/types";

export const halachtiTypoSelection = {
	language: "he",
	orthographicStatus: "Typo",
	selectionCoverage: "Full",
	spelledSelection: "לכתי",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "הלכתי",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Sing",
			person: "1",
			tense: "Past",
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
} satisfies Selection<"he", "Typo", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: halachtiTypoSelection,
	sentenceMarkdown: "אתמול [לכתי] לשוק.",
	title: halachtiTypoSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
