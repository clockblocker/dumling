import type { AttestedSelection, Selection } from "dumling/types";

export const twentyFirstAdjectiveOrdinalSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "twenty-first",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "twenty-first",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "twenty-first",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {
				numForm: "Word",
				numType: "Ord",
			},
			meaningInEmojis: "🔢",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "ADJ">;

export const attestation = {
	selection: twentyFirstAdjectiveOrdinalSelection,
	sentenceMarkdown: "The [twenty-first] attempt finally passed.",
	classifierNotes: "The hyphenated ordinal modifying a noun is ADJ with ordinal number features.",
} as const satisfies AttestedSelection;
