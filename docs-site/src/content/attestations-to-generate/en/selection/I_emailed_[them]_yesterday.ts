import type { AttestedSelection, Selection } from "dumling/types";

export const themAccPronounSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "them",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "them",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Acc",
			number: "Plur",
		},
		lemma: {
			language: "en",
			canonicalLemma: "they",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				person: "3",
				pronType: "Prs",
			},
			meaningInEmojis: "👥",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "PRON">;

export const attestation = {
	selection: themAccPronounSelection,
	sentenceMarkdown: "I emailed [them] yesterday.",
	title: themAccPronounSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
