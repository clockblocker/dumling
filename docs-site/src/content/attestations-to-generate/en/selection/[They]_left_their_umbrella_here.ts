import type { AttestedSelection, Selection } from "dumling/types";

export const theyPronounPluralSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "They",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "they",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Nom",
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
	selection: theyPronounPluralSelection,
	sentenceMarkdown: "[They] left their umbrella here.",
} as const satisfies AttestedSelection;
