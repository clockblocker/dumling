import type { AttestedSelection, Selection } from "dumling/types";

const deSelection006 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Leiter",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Leiter",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Leiter",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🧑‍💼",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection006,
	sentenceMarkdown: "Der [Leiter] der Werkstatt kam später.",
	classifierNotes: "Leiter is the person-role sense here, with masculine gender.",
} as const satisfies AttestedSelection;
