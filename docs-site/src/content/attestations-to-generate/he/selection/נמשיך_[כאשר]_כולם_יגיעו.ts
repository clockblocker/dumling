import type { AttestedSelection, Selection } from "dumling/types";

export const kaasherSubordinatorSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "כאשר",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "כאשר",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "כאשר",
			lemmaKind: "Lexeme",
			lemmaSubKind: "SCONJ",
			inherentFeatures: {
				case: "Tem",
			},
			meaningInEmojis: "⏱️",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Lexeme", "SCONJ">;

export const attestation = {
	selection: kaasherSubordinatorSelection,
	sentenceMarkdown: "נמשיך [כאשר] כולם יגיעו.",
} as const satisfies AttestedSelection;
