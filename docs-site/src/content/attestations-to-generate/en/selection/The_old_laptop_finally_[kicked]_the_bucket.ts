import type { AttestedSelection, Selection } from "dumling/types";

export const kickTheBucketPartialIdiomSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "kicked",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "kick the bucket",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "kick the bucket",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "💀",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	selection: kickTheBucketPartialIdiomSelection,
	sentenceMarkdown: "The old laptop finally [kicked] the bucket.",
} as const satisfies AttestedSelection;
