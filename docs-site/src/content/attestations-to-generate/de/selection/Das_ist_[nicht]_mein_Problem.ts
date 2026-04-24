import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection041 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "nicht",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "nicht",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "nicht",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PART",
			inherentFeatures: {
				polarity: "Neg",
			},
			meaningInEmojis: "⛔",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "PART">;

export const attestation = {
	selection: deSelection041,
	sentenceMarkdown: "Das ist [nicht] mein Problem.",
} as const satisfies AttestedSelection;
