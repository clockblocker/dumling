import type { AttestedSelection, Selection } from "dumling/types";

const deSelection040 = {
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
			meaningInEmojis: "🏊",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Fusion", "General">;

export const attestation = {
	selection: deSelection040,
	sentenceMarkdown: "Sie sprang [ins] kalte Wasser.",
	classifierNotes: "Ins gets the same Fusion/General treatment as zum; the public DTO preserves the fused form intact.",
} as const satisfies AttestedSelection;
