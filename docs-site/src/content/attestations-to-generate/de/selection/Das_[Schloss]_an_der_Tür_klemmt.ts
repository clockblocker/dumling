import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection012 = {
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
			meaningInEmojis: "🔒",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection012,
	sentenceMarkdown: "Das [Schloss] an der Tür klemmt.",
	title: "Schloss: lock",
} as const satisfies AttestedSelection;
