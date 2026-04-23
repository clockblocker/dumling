import type { Selection } from "dumling/types";

export const shelGenitiveSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "של",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "של",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "של",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {
				case: "Gen",
			},
			meaningInEmojis: "🔗",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	order: 111,
	selection: shelGenitiveSelection,
	sentenceMarkdown: "הספר **של** נועה נשאר כאן.",
} as const;
