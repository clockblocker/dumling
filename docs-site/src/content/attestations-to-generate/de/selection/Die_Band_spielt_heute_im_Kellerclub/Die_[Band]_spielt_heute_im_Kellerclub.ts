import type { AttestedSelection, Selection } from "dumling/types";

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
	selection: deSelection003,
	sentenceMarkdown: "Die [Band] spielt heute im Kellerclub.",
	classifierNotes: "This is the feminine lexical item meaning a music group, despite sharing its spelling with the other Band entries.",
} as const satisfies AttestedSelection;
