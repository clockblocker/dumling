import type { AttestedSelection, Selection } from "dumling/types";

const mitHautUndHaarIdiomSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "und",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "mit Haut und Haar",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "mit Haut und Haar",
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
			meaningInEmojis: "💯",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Phraseme", "Idiom">;

export const attestation = {
	selection: mitHautUndHaarIdiomSelection,
	sentenceMarkdown: `Verbrannt ist alles ganz und gar,
das arme Kind mit Haut [und] Haar;`,
	classifierNotes:
		"At the token level this could be ordinary coordination, but inside mit Haut und Haar the conjunction is part of a conventional idiom. I kept the larger idiomatic unit because that is the learner-relevant lexical answer here.",
} as const satisfies AttestedSelection;
