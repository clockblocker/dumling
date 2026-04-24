import type { AttestedSelection, Selection } from "dumling/types";

export const yerushalayimSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ירושלים",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ירושלים",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			number: "Sing",
		},
		lemma: {
			language: "he",
			canonicalLemma: "ירושלים",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PROPN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "🏙️",
		},
	},
} satisfies Selection<"he", "Standard", "Inflection", "Lexeme", "PROPN">;

export const attestation = {
	selection: yerushalayimSelection,
	sentenceMarkdown: "[ירושלים] יפה בלילה.",
	title: yerushalayimSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
