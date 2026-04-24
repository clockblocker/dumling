import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection051 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "ge",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "ge-...-t",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "ge-...-t",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Circumfix",
			inherentFeatures: {},
			meaningInEmojis: "🧬",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Morpheme", "Circumfix">;

export const attestation = {
	selection: deSelection051,
	sentenceMarkdown:
		"In [ge]lacht markieren ge- und -t zusammen das Partizip.",
	classifierNotes: "The circumfix is modeled as one morpheme even though the selected spelling shows only its first visible segment.",
} as const satisfies AttestedSelection;
