import type { Selection } from "dumling/types";

export const deSelection042 = {
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
	order: 241,
	selection: deSelection042,
	sentenceMarkdown: "Das ist schwer **zu** erklären.",
	title: "Zu: infinitive particle",
} as const;
