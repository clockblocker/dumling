import type { AttestedSelection, Selection } from "dumling/types";

export const katavVerbSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "כתב",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "כתב",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Masc",
			number: "Sing",
			person: "3",
			tense: "Past",
		},
		lemma: {
			language: "he",
			canonicalLemma: "כתב",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hebBinyan: "PAAL",
			},
			meaningInEmojis: "✍️",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: katavVerbSelection,
	sentenceMarkdown: "הוא [כתב] מהר.",
} as const satisfies AttestedSelection;
