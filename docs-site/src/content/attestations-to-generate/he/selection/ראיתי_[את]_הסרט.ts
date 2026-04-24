import type { AttestedSelection, Selection } from "dumling/types";

export const etAccusativeSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "את",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "את",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "את",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {
				case: "Acc",
			},
			meaningInEmojis: "🎯",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	selection: etAccusativeSelection,
	sentenceMarkdown: "ראיתי [את] הסרט.",
	title: etAccusativeSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
