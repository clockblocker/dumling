import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection046 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Morgenstund",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Morgenstund hat Gold im Mund",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Morgenstund hat Gold im Mund",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Proverb",
			inherentFeatures: {},
			meaningInEmojis: "🌅",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Phraseme", "Proverb">;

export const attestation = {
	selection: deSelection046,
	sentenceMarkdown: "[Morgenstund] hat Gold im Mund, sagte sie verschlafen.",
	classifierNotes: "This is a partial selection inside a proverb, so the surface and lemma are the full proverb.",
} as const satisfies AttestedSelection;
