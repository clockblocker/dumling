import type { Selection } from "dumling/types";

export const deSelection005 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Leiter",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Leiter",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Leiter",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "🪜",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	order: 204,
	selection: deSelection005,
	sentenceMarkdown: "Die **Leiter** wackelte auf dem nassen Boden.",
	title: "Leiter: ladder",
} as const;
