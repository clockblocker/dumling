import type { AttestedSelection, Selection } from "dumling/types";

export const scissorsPluralTantumSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "scissors",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "scissors",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Ptan",
		},
		lemma: {
			language: "en",
			canonicalLemma: "scissors",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "✂️",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	selection: scissorsPluralTantumSelection,
	sentenceMarkdown: "These [scissors] are blunt.",
} as const satisfies AttestedSelection;
