import type { AttestedSelection, Selection } from "dumling/types";

const definitelyTypoSelection = {
	language: "en",
	selectionFeatures: { orthography: "Typo" },
	spelledSelection: "definately",

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
} satisfies Selection<"en", "Citation", "Lexeme", "ADV">;

export const attestation = {
	selection: definitelyTypoSelection,
	sentenceMarkdown: "I [definately] saved the file.",
	classifierNotes:
		"Definately is a typo of definitely; spellingRelation remains Canonical because the intended standard spelling is canonical, not a licensed variant.",
} as const satisfies AttestedSelection;
