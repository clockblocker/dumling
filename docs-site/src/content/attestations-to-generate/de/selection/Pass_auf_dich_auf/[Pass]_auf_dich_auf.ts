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
	sentenceMarkdown: "[Pass] auf dich auf!",
	classifierNotes:
		"Pass is the finite verb token of the separable imperative pass auf from aufpassen; the governed preposition auf belongs on the lemma, not as a separate ADP analysis.",
} as const satisfies AttestedSelection;
