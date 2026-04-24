import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection033 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Ihrem",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Ihrem",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Dat",
			gender: "Masc",
			number: "Sing",
			"gender[psor]": ["Masc", "Fem", "Neut"],
			"number[psor]": "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "Ihr",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				person: "2",
				polite: "Form",
				poss: "Yes",
				pronType: "Prs",
			},
			meaningInEmojis: "🤝",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "DET">;

export const attestation = {
	selection: deSelection033,
	sentenceMarkdown: "Bitte folgen Sie [Ihrem] Ansprechpartner.",
	classifierNotes: "The capitalized polite possessive is encoded as DET with person 2, polite Form, and poss Yes.",
} as const satisfies AttestedSelection;
