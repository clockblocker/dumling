import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection022 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "gewesen",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "gewesen",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			aspect: "Perf",
			verbForm: "Part",
		},
		lemma: {
			language: "de",
			canonicalLemma: "sein",
			lemmaKind: "Lexeme",
			lemmaSubKind: "AUX",
			inherentFeatures: {},
			meaningInEmojis: "🧩",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "AUX">;

export const attestation = {
	selection: deSelection022,
	sentenceMarkdown: "Das wäre fast schief [gewesen].",
} as const satisfies AttestedSelection;
