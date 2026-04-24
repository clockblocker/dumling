import type { AttestedSelection, Selection } from "dumling/types";

export const dependOnGovernedPrepSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "depend",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "depend on",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "depend on",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hasGovPrep: "on",
			},
			meaningInEmojis: "🔗",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "VERB">;

export const attestation = {
	selection: dependOnGovernedPrepSelection,
	sentenceMarkdown: "We [depend] on accurate labels.",
	title: dependOnGovernedPrepSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
