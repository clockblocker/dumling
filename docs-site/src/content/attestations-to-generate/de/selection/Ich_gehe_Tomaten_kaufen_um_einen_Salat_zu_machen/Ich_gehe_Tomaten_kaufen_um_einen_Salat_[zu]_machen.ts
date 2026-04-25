import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "zu",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "zu",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "zu",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PART",
			inherentFeatures: {
				partType: "Inf",
			},
			meaningInEmojis: "🔧",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "PART">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Ich gehe Tomaten kaufen, um einen Salat [zu] machen.",
	classifierNotes:
		"This is infinitival zu inside an um ... zu purpose clause, so the selected token stays PART with partType Inf rather than the preposition zu.",
} as const satisfies AttestedSelection;
