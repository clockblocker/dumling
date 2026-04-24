import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "und",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "und",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "und",
			lemmaKind: "Lexeme",
			lemmaSubKind: "CCONJ",
			inherentFeatures: {},
			meaningInEmojis: "➕",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "CCONJ">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Die Peitsche hat er mitgebracht
[und] nimmt sie sorglich sehr in acht.`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
