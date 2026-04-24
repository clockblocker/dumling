import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection008 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Kiefer",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Kiefer",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Kiefer",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "🌲",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection008,
	sentenceMarkdown: "Die alte [Kiefer] steht am Hang.",
} as const satisfies AttestedSelection;
