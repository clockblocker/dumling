import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "pfui",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "pfui",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "pfui",
			lemmaKind: "Lexeme",
			lemmaSubKind: "INTJ",
			inherentFeatures: {},
			meaningInEmojis: "🤢",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "INTJ">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Sieh einmal, hier steht er, 
[pfui], der Struwwelpeter!`,
	classifierNotes:
		"Pfui is treated as a plain interjection. I did not force `partType: Res` because this use expresses disgust/exclamation, not the schema's narrower response-particle reading.",
} as const satisfies AttestedSelection;
