import type { AttestedSelection, Selection } from "dumling/types";

export const spillTheBeansPartialIdiomSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "spilled",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "spill the beans",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "spill the beans",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "🤫",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	selection: spillTheBeansPartialIdiomSelection,
	sentenceMarkdown: "Mira finally [spilled] the beans.",
	classifierNotes: "Inflected spilled is selected inside an idiom, but Phraseme currently has citation surfaces only, so this is a partial selection of the citation form.",
} as const satisfies AttestedSelection;
