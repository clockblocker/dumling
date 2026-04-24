import type { Selection } from "dumling/types";

export const deSelection024 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "muss",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "muss",
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
			canonicalLemma: "müssen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "AUX",
			inherentFeatures: {
				verbType: "Mod",
			},
			meaningInEmojis: "⚠️",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "AUX">;

export const attestation = {
	order: 223,
	selection: deSelection024,
	sentenceMarkdown: "Das **muss** heute noch raus.",
	title: "Muss: modal auxiliary",
} as const;
