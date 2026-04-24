import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection019 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "übergesetzt",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "übergesetzt",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			aspect: "Perf",
			verbForm: "Part",
		},
		lemma: {
			language: "de",
			canonicalLemma: "übersetzen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "⛴️",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection019,
	sentenceMarkdown: "Der Fährmann hat uns [übergesetzt].",
	title: "Übergesetzt: ferry across participle",
} as const satisfies AttestedSelection;
