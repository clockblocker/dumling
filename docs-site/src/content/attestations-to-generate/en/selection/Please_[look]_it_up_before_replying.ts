import type { AttestedSelection, Selection } from "dumling/types";

export const lookUpPartialPhrasalVerbSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "look",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "look up",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "look up",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				phrasal: "Yes",
			},
			meaningInEmojis: "🔎",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "VERB">;

export const attestation = {
	selection: lookUpPartialPhrasalVerbSelection,
	sentenceMarkdown: "Please [look] it up before replying.",
} as const satisfies AttestedSelection;
