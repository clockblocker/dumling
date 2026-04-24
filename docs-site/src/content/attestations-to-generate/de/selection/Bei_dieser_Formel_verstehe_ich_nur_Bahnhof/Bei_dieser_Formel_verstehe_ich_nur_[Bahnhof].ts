import type { AttestedSelection, Selection } from "dumling/types";

const deSelection043 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Bahnhof",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "nur Bahnhof verstehen",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "nur Bahnhof verstehen",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "❓",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	selection: deSelection043,
	sentenceMarkdown: "Bei dieser Formel verstehe ich nur [Bahnhof].",
	classifierNotes: "The selected word is a noun-shaped substring inside the idiom nur Bahnhof verstehen, so the selection coverage is partial.",
} as const satisfies AttestedSelection;
