import type { Selection } from "dumling/types";

export const deSelection010 = {
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
			meaningInEmojis: "🔩",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	order: 209,
	selection: deSelection010,
	sentenceMarkdown: "Die **Mutter** passt nicht auf diese Schraube.",
	title: "Mutter: nut",
} as const;
