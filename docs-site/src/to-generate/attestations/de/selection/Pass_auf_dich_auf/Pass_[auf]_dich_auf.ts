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
		"The governed preposition token still points to the same verbal surface `pass auf`; encode `auf` only in `lemma.inherentFeatures.hasGovPrep`, not as a standalone ADP and not by expanding `normalizedFullSurface`.",
	isVerified: true,
} as const satisfies AttestedSelection;
