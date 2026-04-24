import type { Selection } from "dumling/types";

export const deSelection031 = {
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
	order: 230,
	selection: deSelection031,
	sentenceMarkdown: "Der Autor, **dessen** Buch fehlt, wartet draußen.",
	title: "Dessen: relative pronoun",
} as const;
