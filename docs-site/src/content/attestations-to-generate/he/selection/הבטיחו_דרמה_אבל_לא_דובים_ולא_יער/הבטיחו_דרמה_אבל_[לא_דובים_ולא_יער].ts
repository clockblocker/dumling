import type { AttestedSelection, Selection } from "dumling/types";

const loDubimVeloYaarSelection = {
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
	selection: loDubimVeloYaarSelection,
	sentenceMarkdown: "הבטיחו דרמה, אבל [לא דובים ולא יער].",
	classifierNotes: "לא דובים ולא יער is classified as an idiom; it is proverb-like, but used here as a fixed idiomatic denial.",
} as const satisfies AttestedSelection;
