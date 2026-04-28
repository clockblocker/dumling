import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	spelledSelection: "gekocht",

	surface: {
		language: "de",
		normalizedFullSurface: "gekocht",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "gekocht",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "🍳",
		},
	},
} satisfies Selection<"de", "Citation", "Lexeme", "ADJ">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Die Kartoffeln sind bereits [gekocht].",
	classifierNotes:
		"Here gekocht is best treated as a citation-shaped adjective in predicative position: it is the complement of sind and describes the potatoes' resulting state, with bereits reinforcing that stative reading rather than a verbal perfect/passive parse.",
	isVerified: true,
} as const satisfies AttestedSelection;
