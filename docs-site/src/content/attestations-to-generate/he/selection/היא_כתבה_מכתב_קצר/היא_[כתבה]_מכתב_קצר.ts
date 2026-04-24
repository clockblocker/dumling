import type { AttestedSelection, Selection } from "dumling/types";

const katvaVerbSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "כתבה",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "כתבה",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			gender: "Fem",
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
	selection: katvaVerbSelection,
	sentenceMarkdown: "היא [כתבה] מכתב קצר.",
	classifierNotes: "כתבה is the past feminine-singular verb from כתב despite the homographic noun article.",
} as const satisfies AttestedSelection;
