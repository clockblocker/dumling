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
	classifierNotes: "This is the ferry-across participle, with related spelling but a different sense.",
} as const satisfies AttestedSelection;
