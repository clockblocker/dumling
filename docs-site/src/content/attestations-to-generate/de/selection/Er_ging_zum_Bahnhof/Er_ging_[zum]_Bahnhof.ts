import type { AttestedSelection, Selection } from "dumling/types";

const deSelection039 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "zum",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "zum",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "zum",
			lemmaKind: "Fusion",
			lemmaSubKind: "General",
			inherentFeatures: {},
			meaningInEmojis: "➡️",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Fusion", "General">;

export const attestation = {
	selection: deSelection039,
	sentenceMarkdown: "Er ging [zum] Bahnhof.",
	classifierNotes: "Zum is modeled as Fusion/General, with the fused form itself as the canonical lemma and citation surface.",
} as const satisfies AttestedSelection;
