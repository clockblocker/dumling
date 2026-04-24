import type { AttestedSelection, Selection } from "dumling/types";

const deSelection034 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "seinen",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "seinen",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Acc",
			gender: "Masc",
			number: "Sing",
			"gender[psor]": "Masc",
			"number[psor]": "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "sein",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				person: "3",
				poss: "Yes",
				pronType: "Prs",
			},
			meaningInEmojis: "🔑",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "DET">;

export const attestation = {
	selection: deSelection034,
	sentenceMarkdown: "Er vergaß [seinen] Schlüssel im Büro.",
	classifierNotes: "Possessor gender is represented separately from agreement gender.",
} as const satisfies AttestedSelection;
