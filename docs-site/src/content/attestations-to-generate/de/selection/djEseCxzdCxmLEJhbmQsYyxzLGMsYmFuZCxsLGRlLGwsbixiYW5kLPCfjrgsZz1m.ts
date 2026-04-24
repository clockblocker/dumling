import type { Selection } from "dumling/types";

export const deSelection003 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Band",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Band",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Band",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "🎸",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	order: 202,
	selection: deSelection003,
	sentenceMarkdown: "Die **Band** spielt heute im Kellerclub.",
	title: "Band: music group",
} as const;
