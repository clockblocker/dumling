import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection004 = {
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
				gender: "Masc",
			},
			meaningInEmojis: "📘",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection004,
	sentenceMarkdown: "Der dritte [Band] ist längst vergriffen.",
	title: "Band: book volume",
} as const satisfies AttestedSelection;
