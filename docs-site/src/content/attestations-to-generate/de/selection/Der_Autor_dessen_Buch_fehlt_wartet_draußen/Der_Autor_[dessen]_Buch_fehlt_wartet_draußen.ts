import type { AttestedSelection, Selection } from "dumling/types";

const deSelection031 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "dessen",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "dessen",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Gen",
			gender: "Masc",
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
	selection: deSelection031,
	sentenceMarkdown: "Der Autor, [dessen] Buch fehlt, wartet draußen.",
	classifierNotes: "Dessen is a genitive relative pronoun with masculine antecedent features from the sentence.",
} as const satisfies AttestedSelection;
