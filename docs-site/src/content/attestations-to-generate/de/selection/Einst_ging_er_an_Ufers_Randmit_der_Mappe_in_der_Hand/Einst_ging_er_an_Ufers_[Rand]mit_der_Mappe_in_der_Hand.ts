import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Rand",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Rand",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Acc",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "Rand",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🧭",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Einst ging er an Ufers [Rand]
mit der Mappe in der Hand.`,
	classifierNotes:
		"I classified `Rand` as accusative singular because `ging an ...` most naturally reads as directional movement toward the riverbank. I was not fully certain because the bare form `Rand` is syncretic here and a locative dative reading is also possible in poetic style.",
} as const satisfies AttestedSelection;
