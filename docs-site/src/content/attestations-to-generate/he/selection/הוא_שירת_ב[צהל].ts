import type { AttestedSelection, Selection } from "dumling/types";

export const tzahalAbbrevSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: 'צה"ל',
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: 'צה"ל',
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: 'צה"ל',
			lemmaKind: "Lexeme",
			lemmaSubKind: "PROPN",
			inherentFeatures: {
				abbr: "Yes",
				gender: "Masc",
			},
			meaningInEmojis: "🪖",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "PROPN">;

export const attestation = {
	selection: tzahalAbbrevSelection,
	sentenceMarkdown: 'הוא שירת ב[צה"ל].',
} as const satisfies AttestedSelection;
