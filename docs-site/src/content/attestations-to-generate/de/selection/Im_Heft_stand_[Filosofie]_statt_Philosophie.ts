import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection053 = {
	language: "de",
	orthographicStatus: "Typo",
	selectionCoverage: "Full",
	spelledSelection: "Filosofie",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "Filosofie",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Nom",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "Philosophie",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "📚",
		},
	},
} satisfies Selection<"de", "Typo", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection053,
	sentenceMarkdown: "Im Heft stand [Filosofie] statt Philosophie.",
} as const satisfies AttestedSelection;
