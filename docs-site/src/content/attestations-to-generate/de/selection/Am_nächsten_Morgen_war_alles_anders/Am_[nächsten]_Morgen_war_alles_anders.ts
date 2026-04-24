import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection028 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "nächsten",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "nächsten",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Dat",
			degree: "Sup",
			gender: "Masc",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "nah",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "➡️",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "ADJ">;

export const attestation = {
	selection: deSelection028,
	sentenceMarkdown: "Am [nächsten] Morgen war alles anders.",
	classifierNotes: "Nächsten is treated as an adjective inflection in a fixed temporal expression.",
} as const satisfies AttestedSelection;
