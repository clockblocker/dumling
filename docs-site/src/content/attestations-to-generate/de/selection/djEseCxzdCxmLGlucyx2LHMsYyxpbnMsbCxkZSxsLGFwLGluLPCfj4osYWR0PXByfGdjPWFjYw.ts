import type { Selection } from "dumling/types";

export const deSelection040 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ins",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "ins",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "in",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {
				adpType: "Prep",
				governedCase: "Acc",
			},
			meaningInEmojis: "🏊",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	order: 239,
	selection: deSelection040,
	sentenceMarkdown: "Sie sprang **ins** kalte Wasser.",
	title: "Ins: contraction",
} as const;
