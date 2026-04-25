import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Einst",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "einst",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "einst",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADV",
			inherentFeatures: {},
			meaningInEmojis: "🕰️",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "ADV">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `[Einst] ging er an Ufers Rand
mit der Mappe in der Hand.`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
