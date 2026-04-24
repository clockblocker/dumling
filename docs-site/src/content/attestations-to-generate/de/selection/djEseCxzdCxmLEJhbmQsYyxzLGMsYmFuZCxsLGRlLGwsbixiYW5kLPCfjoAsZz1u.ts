import type { Selection } from "dumling/types";

export const deSelection002 = {
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
				gender: "Neut",
			},
			meaningInEmojis: "🎀",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	order: 201,
	selection: deSelection002,
	sentenceMarkdown: "Das rote **Band** lag auf dem Geschenk.",
	title: "Band: ribbon",
} as const;
