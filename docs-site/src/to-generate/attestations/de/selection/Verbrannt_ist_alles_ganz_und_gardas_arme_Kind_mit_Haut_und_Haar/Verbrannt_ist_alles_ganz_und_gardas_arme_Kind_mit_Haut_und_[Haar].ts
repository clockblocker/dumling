import type { AttestedSelection, Selection } from "dumling/types";

const mitHautUndHaarIdiomSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Haar",
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
das arme Kind mit Haut und [Haar];`,
	classifierNotes:
		"Like Haut in the same phrase, Haar could be read literally in context, but I still classified it as a partial selection of the idiom mit Haut und Haar because the larger phrase contributes the lexical meaning completely.",
} as const satisfies AttestedSelection;
