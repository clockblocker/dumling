import type { AttestedSelection, Selection } from "dumling/types";

export const unPrefixPartialSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "un",
	spellingRelation: "Variant",
	surface: {
		language: "en",
		normalizedFullSurface: "un-",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "un-",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Prefix",
			inherentFeatures: {},
			meaningInEmojis: "🚫",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Morpheme", "Prefix">;

export const attestation = {
	selection: unPrefixPartialSelection,
	sentenceMarkdown: "That answer was [un]believable.",
	title: unPrefixPartialSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
