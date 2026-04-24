import type { AttestedSelection, Selection } from "dumling/types";

const bloodyInfixPartialSelection = {
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
	classifierNotes: "Expletive insertion is classified as Infix to stress an edge case that is morphologically debatable.",
} as const satisfies AttestedSelection;
