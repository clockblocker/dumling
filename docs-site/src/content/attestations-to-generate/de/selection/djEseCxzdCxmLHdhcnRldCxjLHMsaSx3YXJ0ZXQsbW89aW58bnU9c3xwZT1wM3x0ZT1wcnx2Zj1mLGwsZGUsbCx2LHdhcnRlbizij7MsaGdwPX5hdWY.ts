import type { Selection } from "dumling/types";

export const deSelection021 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "wartet",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "wartet",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Ind",
			number: "Sing",
			person: "3",
			tense: "Pres",
			verbForm: "Fin",
		},
		lemma: {
			language: "de",
			canonicalLemma: "warten",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hasGovPrep: "auf",
			},
			meaningInEmojis: "⏳",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	order: 220,
	selection: deSelection021,
	sentenceMarkdown: "Er **wartet** auf den Nachtbus.",
	title: "Wartet: governed preposition",
} as const;
