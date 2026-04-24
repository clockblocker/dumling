import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection035 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "keinem",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "keinem",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Dat",
			gender: "Neut",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "kein",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				pronType: "Neg",
			},
			meaningInEmojis: "🚫",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "DET">;

export const attestation = {
	selection: deSelection035,
	sentenceMarkdown: "Mit [keinem] Wort erwähnte sie den Plan.",
	classifierNotes: "Keinem is a negative determiner rather than a pronoun because it modifies Wort.",
} as const satisfies AttestedSelection;
