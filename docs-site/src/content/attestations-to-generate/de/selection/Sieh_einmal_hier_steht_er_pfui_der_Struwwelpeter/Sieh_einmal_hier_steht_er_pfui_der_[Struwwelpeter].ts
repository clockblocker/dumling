import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Struwwelpeter",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Struwwelpeter",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Struwwelpeter",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PROPN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🧒",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "PROPN">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Sieh einmal, hier steht er, 
pfui, der [Struwwelpeter]!`,
	classifierNotes:
		"I treated Struwwelpeter as PROPN: der is a stylistic article here, but the referent is still the named character rather than a common noun.",
} as const satisfies AttestedSelection;
