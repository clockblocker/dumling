import type { Selection } from "dumling/types";

export const deSelection039 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "zum",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "zum",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "zu",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {
				adpType: "Prep",
				governedCase: "Dat",
			},
			meaningInEmojis: "➡️",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	order: 238,
	selection: deSelection039,
	sentenceMarkdown: "Er ging **zum** Bahnhof.",
	title: "Zum: contraction",
} as const;
