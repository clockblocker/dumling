import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Peitsche",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Peitsche",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Peitsche",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "🪢",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Die [Peitsche] hat er mitgebracht
und nimmt sie sorglich sehr in acht.`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
