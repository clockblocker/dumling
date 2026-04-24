import type { AttestedSelection, Selection } from "dumling/types";

export const leadNounHomographSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "lead",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "lead",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "lead",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "⚙️",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: leadNounHomographSelection,
	sentenceMarkdown: "The pipe contained traces of [lead].",
	title: leadNounHomographSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
