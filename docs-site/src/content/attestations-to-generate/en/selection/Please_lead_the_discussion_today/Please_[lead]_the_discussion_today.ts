import type { AttestedSelection, Selection } from "dumling/types";

const leadVerbHomographSelection = {
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
	classifierNotes: "Verb lead is kept separate from noun lead despite identical spelling.",
} as const satisfies AttestedSelection;
