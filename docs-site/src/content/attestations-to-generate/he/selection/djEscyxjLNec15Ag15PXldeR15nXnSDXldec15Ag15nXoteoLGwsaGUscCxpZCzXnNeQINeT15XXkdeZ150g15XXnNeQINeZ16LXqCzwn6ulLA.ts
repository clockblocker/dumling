import type { Selection } from "dumling/types";

export const loDubimVeloYaarSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "לא דובים ולא יער",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "לא דובים ולא יער",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "לא דובים ולא יער",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "🫥",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	order: 107,
	selection: loDubimVeloYaarSelection,
	sentenceMarkdown: "הבטיחו דרמה, אבל **לא דובים ולא יער**.",
} as const;
