import type { Selection } from "dumling/types";

export const deSelection044 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Hase",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "da liegt der Hase im Pfeffer",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "da liegt der Hase im Pfeffer",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "🧩",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	order: 243,
	selection: deSelection044,
	sentenceMarkdown: "Genau da liegt der **Hase** im Pfeffer.",
	title: "Hase in idiom",
} as const;
