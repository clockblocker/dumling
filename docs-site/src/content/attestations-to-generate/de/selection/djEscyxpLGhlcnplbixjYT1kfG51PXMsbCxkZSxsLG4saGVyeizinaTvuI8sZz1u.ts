import type { Selection } from "dumling/types";

export const deSelection014 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Herzen",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Herzen",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Dat",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "Herz",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Neut",
			},
			meaningInEmojis: "❤️",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	order: 213,
	selection: deSelection014,
	sentenceMarkdown: "Sie folgte ihrem **Herzen**.",
	title: "Herzen: weak dative singular",
} as const;
