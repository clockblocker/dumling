import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Die",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "die",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Nom",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "der",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				definite: "Def",
				pronType: "Art",
			},
			meaningInEmojis: "🧩",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "DET">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `[Die] Peitsche hat er mitgebracht
und nimmt sie sorglich sehr in acht.`,
	classifierNotes:
		"Sentence-initial Die is the capitalized article form of der, not a pronoun; the determiner surface stays nominative singular here without encoding feminine gender.",
} as const satisfies AttestedSelection;
