import type { AttestedSelection, Selection } from "dumling/types";

export const nichtavVerbSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "נכתב",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "נכתב",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Masc",
			number: "Sing",
			person: "3",
			tense: "Past",
			voice: "Pass",
		},
		lemma: {
			language: "he",
			canonicalLemma: "כתב",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hebBinyan: "NIFAL",
			},
			meaningInEmojis: "✍️",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: nichtavVerbSelection,
	sentenceMarkdown: 'הדו"ח [נכתב] אתמול.',
	title: nichtavVerbSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
