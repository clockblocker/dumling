import type { AttestedSelection, Selection } from "dumling/types";

export const upParticleSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "up",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "up",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "up",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PART",
			inherentFeatures: {},
			meaningInEmojis: "⬆️",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "PART">;

export const attestation = {
	selection: upParticleSelection,
	sentenceMarkdown: "She gave [up] after midnight.",
} as const satisfies AttestedSelection;
