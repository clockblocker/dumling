import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Pass",
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
				hasGovPrep: "auf",
				hasSepPrefix: "auf",
			},
			meaningInEmojis: "👀",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Pass [auf] dich auf!",
	classifierNotes:
		"The first auf realizes the governed preposition selected by aufpassen, so it is stored as a partial selection of the verb lexeme rather than as a standalone ADP.",
} as const satisfies AttestedSelection;
