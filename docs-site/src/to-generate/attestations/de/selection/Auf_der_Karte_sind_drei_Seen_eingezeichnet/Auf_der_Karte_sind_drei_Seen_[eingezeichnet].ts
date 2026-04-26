import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "eingezeichnet",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "eingezeichnet",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			aspect: "Perf",
			verbForm: "Part",
		},
		lemma: {
			language: "de",
			canonicalLemma: "einzeichnen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hasSepPrefix: "ein",
			},
			meaningInEmojis: "🗺️",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Auf der Karte sind drei Seen [eingezeichnet].",
	classifierNotes:
		"Eingezeichnet is treated as the perfect participle of separable einzeichnen. The clause has a result-state or passive-like reading, but dumling's German pattern stores the selected form itself as a verbal participle rather than recasting it as an adjective.",
	isVerified: true,
} as const satisfies AttestedSelection;
