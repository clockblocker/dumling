import type { AttestedSelection, Selection } from "dumling/types";

export const likeSubordinatorSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "like",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "like",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "like",
			lemmaKind: "Lexeme",
			lemmaSubKind: "SCONJ",
			inherentFeatures: {
				style: "Vrnc",
			},
			meaningInEmojis: "↔️",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "SCONJ">;

export const attestation = {
	selection: likeSubordinatorSelection,
	sentenceMarkdown: "Do it [like] I showed you.",
} as const satisfies AttestedSelection;
