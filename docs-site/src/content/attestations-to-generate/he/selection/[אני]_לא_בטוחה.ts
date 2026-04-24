import type { AttestedSelection, Selection } from "dumling/types";

export const aniPronounSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "אני",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "אני",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Sing",
			person: "1",
		},
		lemma: {
			language: "he",
			canonicalLemma: "אני",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				pronType: "Prs",
			},
			meaningInEmojis: "🙋",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "PRON">;

export const attestation = {
	selection: aniPronounSelection,
	sentenceMarkdown: "[אני] לא בטוחה.",
} as const satisfies AttestedSelection;
