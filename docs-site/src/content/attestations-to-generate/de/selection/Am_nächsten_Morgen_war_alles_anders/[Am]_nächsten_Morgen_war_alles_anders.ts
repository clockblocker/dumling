import type { AttestedSelection, Selection } from "dumling/types";

const deSelection054 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Am",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "am",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "am",
			lemmaKind: "Fusion",
			lemmaSubKind: "General",
			inherentFeatures: {},
			meaningInEmojis: "🌅",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Fusion", "General">;

export const attestation = {
	selection: deSelection054,
	sentenceMarkdown: "[Am] nächsten Morgen war alles anders.",
	classifierNotes:
		"Am is modeled as Fusion/General, parallel to zum and ins, with the capitalized sentence-initial spelling treated as a variant of citation am.",
} as const satisfies AttestedSelection;
