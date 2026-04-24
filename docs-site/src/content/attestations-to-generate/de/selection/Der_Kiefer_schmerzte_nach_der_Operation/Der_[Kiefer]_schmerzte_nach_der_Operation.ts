import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection007 = {
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
				gender: "Masc",
			},
			meaningInEmojis: "🦷",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection007,
	sentenceMarkdown: "Der [Kiefer] schmerzte nach der Operation.",
	classifierNotes: "Kiefer is the masculine jaw sense here.",
} as const satisfies AttestedSelection;
