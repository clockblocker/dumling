import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection036 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "manchem",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "manchem",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Dat",
			gender: "Masc",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "manch",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				pronType: "Ind",
			},
			meaningInEmojis: "🎲",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "DET">;

export const attestation = {
	selection: deSelection036,
	sentenceMarkdown: "Nach [manchem] Fehler lernt man schneller.",
} as const satisfies AttestedSelection;
