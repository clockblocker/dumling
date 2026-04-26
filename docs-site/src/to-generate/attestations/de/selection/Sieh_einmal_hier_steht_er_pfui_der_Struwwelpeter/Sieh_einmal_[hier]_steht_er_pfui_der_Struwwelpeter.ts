import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "hier",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "hier",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "hier",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADV",
			inherentFeatures: {},
			meaningInEmojis: "📍",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "ADV">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Sieh einmal, [hier] steht er, 
pfui, der Struwwelpeter!`,
	classifierNotes: "",
	isVerified: true,
} as const satisfies AttestedSelection;
