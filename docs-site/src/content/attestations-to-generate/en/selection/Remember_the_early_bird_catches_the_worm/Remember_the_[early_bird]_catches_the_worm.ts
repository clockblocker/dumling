import type { AttestedSelection, Selection } from "dumling/types";

const earlyBirdProverbPartialSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "early bird",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "the early bird catches the worm",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "the early bird catches the worm",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Proverb",
			inherentFeatures: {},
			meaningInEmojis: "🐦",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Phraseme", "Proverb">;

export const attestation = {
	selection: earlyBirdProverbPartialSelection,
	sentenceMarkdown: "Remember, the [early bird] catches the worm.",
	classifierNotes: "Partial proverb selection tests whether the model recovers the full proverb from a salient fragment.",
} as const satisfies AttestedSelection;
