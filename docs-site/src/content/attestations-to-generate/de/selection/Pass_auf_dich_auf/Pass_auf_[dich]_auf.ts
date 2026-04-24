import type { AttestedSelection, Selection } from "dumling/types";

const dichReflexivePronounSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "dich",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "dich",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Acc",
			number: "Sing",
			reflex: "Yes",
		},
		lemma: {
			language: "de",
			canonicalLemma: "du",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				person: "2",
				pronType: "Prs",
			},
			meaningInEmojis: "👉",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "PRON">;

export const attestation = {
	selection: dichReflexivePronounSelection,
	sentenceMarkdown: "Pass auf [dich] auf!",
	classifierNotes:
		"Dich is encoded as the accusative second-person pronoun du, with reflexive use marked on the inflected surface.",
} as const satisfies AttestedSelection;
