import type { AttestedSelection, Selection } from "dumling/types";

export const bloodyInfixPartialSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "bloody",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "bloody",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "bloody",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Infix",
			inherentFeatures: {},
			meaningInEmojis: "💢",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Morpheme", "Infix">;

export const attestation = {
	selection: bloodyInfixPartialSelection,
	sentenceMarkdown: "Abso-[bloody]-lutely not.",
	title: bloodyInfixPartialSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
