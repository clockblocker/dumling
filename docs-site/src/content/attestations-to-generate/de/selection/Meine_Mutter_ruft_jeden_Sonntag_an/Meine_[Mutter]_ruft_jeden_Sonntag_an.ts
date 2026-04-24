import type { AttestedSelection, Selection } from "dumling/types";

const deSelection009 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Mutter",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Mutter",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Mutter",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Fem",
			},
			meaningInEmojis: "👩",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection009,
	sentenceMarkdown: "Meine [Mutter] ruft jeden Sonntag an.",
	classifierNotes: "This is the kinship noun Mutter.",
} as const satisfies AttestedSelection;
