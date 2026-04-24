import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection052 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "chen",
	spellingRelation: "Variant",
	surface: {
		language: "de",
		normalizedFullSurface: "-chen",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "-chen",
			lemmaKind: "Morpheme",
			lemmaSubKind: "Suffix",
			inherentFeatures: {},
			meaningInEmojis: "🔎",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Morpheme", "Suffix">;

export const attestation = {
	selection: deSelection052,
	sentenceMarkdown: "Bei Mäd[chen] ist -chen kein freies Wort.",
	title: "-chen suffix",
} as const satisfies AttestedSelection;
