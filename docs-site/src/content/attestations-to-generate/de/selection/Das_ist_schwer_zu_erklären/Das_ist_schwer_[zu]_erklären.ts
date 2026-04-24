import type { AttestedSelection, Selection } from "dumling/types";

const deSelection042 = {
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
	selection: deSelection042,
	sentenceMarkdown: "Das ist schwer [zu] erklären.",
	classifierNotes: "Infinitival zu is PART with partType Inf, distinct from prepositional zu.",
} as const satisfies AttestedSelection;
