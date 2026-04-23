import type { Selection } from "dumling/types";

export const deSelection025 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "geh",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "geh",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Imp",
			number: "Sing",
			person: "2",
			verbForm: "Fin",
		},
		lemma: {
			language: "de",
			canonicalLemma: "gehen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "🚶",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	order: 224,
	selection: deSelection025,
	sentenceMarkdown: "**Geh** bitte nicht ohne Jacke raus.",
	title: "Geh: imperative",
} as const;
