import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection029 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "linke",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "linke",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Nom",
			degree: "Pos",
			gender: "Fem",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "links",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "⬅️",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "ADJ">;

export const attestation = {
	selection: deSelection029,
	sentenceMarkdown: "Die [linke] Hand zitterte.",
	title: "Linke: short adjective variant",
} as const satisfies AttestedSelection;
