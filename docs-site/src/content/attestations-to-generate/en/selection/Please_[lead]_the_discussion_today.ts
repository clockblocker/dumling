import type { AttestedSelection, Selection } from "dumling/types";

export const leadVerbHomographSelection = {
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
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "🧭",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "VERB">;

export const attestation = {
	selection: leadVerbHomographSelection,
	sentenceMarkdown: "Please [lead] the discussion today.",
	title: leadVerbHomographSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
