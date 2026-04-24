import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection032 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "deren",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "deren",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Gen",
			gender: "Fem",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "der",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				pronType: "Rel",
			},
			meaningInEmojis: "🔗",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "PRON">;

export const attestation = {
	selection: deSelection032,
	sentenceMarkdown: "Die Zeugin, [deren] Aussage zählt, bleibt anonym.",
} as const satisfies AttestedSelection;
