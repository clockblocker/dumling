import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ins",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "ins",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "ins",
			lemmaKind: "Fusion",
			lemmaSubKind: "General",
			inherentFeatures: {},
			meaningInEmojis: "➡️",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Fusion", "General">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `nahm Ranzen, Pulverhorn und Flint
und lief hinaus [ins] Feld geschwind`,
	classifierNotes:
		"Ins is the usual German fused form, so Dumling keeps it as Fusion/General rather than decomposing it into in + das.",
} as const satisfies AttestedSelection;
