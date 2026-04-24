import type { AttestedSelection, Selection } from "dumling/types";

const yerushalayimSelection = {
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
	classifierNotes: "ירושלים is a proper noun with feminine inherent gender and singular surface number.",
} as const satisfies AttestedSelection;
