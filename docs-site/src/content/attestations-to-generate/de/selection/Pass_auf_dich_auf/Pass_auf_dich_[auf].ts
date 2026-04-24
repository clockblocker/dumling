import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "auf",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "pass auf",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Imp",
			number: "Sing",
			person: "2",
			verbForm: "Fin",
		},
		lemma: {
			language: "de",
			canonicalLemma: "aufpassen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hasSepPrefix: "auf",
			},
			meaningInEmojis: "👀",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Pass auf dich [auf]!",
	classifierNotes:
		"This is the separable imperative form pass auf of aufpassen; the selected spelling captures only the detached prefix token.",
} as const satisfies AttestedSelection;
