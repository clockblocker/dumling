import type { AttestedSelection, Selection } from "dumling/types";

export const definitelyTypoSelection = {
	language: "en",
	orthographicStatus: "Typo",
	selectionCoverage: "Full",
	spelledSelection: "definately",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "definitely",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "definitely",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADV",
			inherentFeatures: {},
			meaningInEmojis: "✅",
		},
	},
} satisfies Selection<"en", "Typo", "Citation", "Lexeme", "ADV">;

export const attestation = {
	selection: definitelyTypoSelection,
	sentenceMarkdown: "I [definately] saved the file.",
	title: definitelyTypoSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
