import type { AttestedSelection, Selection } from "dumling/types";

const unPrefixPartialSelection = {
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
	classifierNotes: "The canonical prefix contains a hyphen, but the selected substring inside a word does not, so it is marked Variant and Partial.",
} as const satisfies AttestedSelection;
