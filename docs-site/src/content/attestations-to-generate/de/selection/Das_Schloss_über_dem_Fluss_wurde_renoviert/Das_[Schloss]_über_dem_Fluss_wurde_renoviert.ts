import type { AttestedSelection, Selection } from "dumling/types";

const deSelection011 = {
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
	selection: deSelection011,
	sentenceMarkdown: "Das [Schloss] über dem Fluss wurde renoviert.",
	classifierNotes: "This is the castle sense of Schloss.",
} as const satisfies AttestedSelection;
