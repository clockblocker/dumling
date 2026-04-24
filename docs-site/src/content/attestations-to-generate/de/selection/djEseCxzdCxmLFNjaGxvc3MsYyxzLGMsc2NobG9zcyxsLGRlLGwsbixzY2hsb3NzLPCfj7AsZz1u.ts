import type { Selection } from "dumling/types";

export const deSelection011 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Schloss",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Schloss",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Schloss",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Neut",
			},
			meaningInEmojis: "🏰",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	order: 210,
	selection: deSelection011,
	sentenceMarkdown: "Das **Schloss** über dem Fluss wurde renoviert.",
	title: "Schloss: castle",
} as const;
