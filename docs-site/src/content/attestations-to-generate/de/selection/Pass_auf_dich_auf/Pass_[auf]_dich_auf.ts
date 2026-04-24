import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "auf",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "auf",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "auf",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {
				adpType: "Prep",
				governedCase: "Acc",
			},
			meaningInEmojis: "🎯",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Pass [auf] dich auf!",
	classifierNotes:
		"The first auf is the accusative-governing preposition in auf dich, distinct from the final detached particle of aufpassen.",
} as const satisfies AttestedSelection;
