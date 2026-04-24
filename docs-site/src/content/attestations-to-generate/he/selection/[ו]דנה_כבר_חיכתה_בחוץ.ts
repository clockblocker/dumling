import type { AttestedSelection, Selection } from "dumling/types";

export const vavCliticSelection = {
	language: "he",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ו",
	spellingRelation: "Canonical",
	surface: {
		language: "he",
		normalizedFullSurface: "ו",
		surfaceKind: "Citation",
		lemma: {
			language: "he",
			canonicalLemma: "ו",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Clitic",
			inherentFeatures: {},
			meaningInEmojis: "➕",
		},
	},
} satisfies Selection<"he", "Standard", "Citation", "Morpheme", "Clitic">;

export const attestation = {
	selection: vavCliticSelection,
	sentenceMarkdown: "[ו]דנה כבר חיכתה בחוץ.",
	title: vavCliticSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
