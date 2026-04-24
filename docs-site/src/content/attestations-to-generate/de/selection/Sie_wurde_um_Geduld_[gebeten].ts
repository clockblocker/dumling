import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection026 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "gebeten",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "gebeten",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			aspect: "Perf",
			verbForm: "Part",
		},
		lemma: {
			language: "de",
			canonicalLemma: "bitten",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hasGovPrep: "um",
			},
			meaningInEmojis: "🙏",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection026,
	sentenceMarkdown: "Sie wurde um Geduld [gebeten].",
} as const satisfies AttestedSelection;
