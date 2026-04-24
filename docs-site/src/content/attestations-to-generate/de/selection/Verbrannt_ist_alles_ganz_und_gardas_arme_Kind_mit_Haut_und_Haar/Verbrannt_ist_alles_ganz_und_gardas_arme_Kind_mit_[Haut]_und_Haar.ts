import type { AttestedSelection, Selection } from "dumling/types";

const mitHautUndHaarIdiomSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "Haut",
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
das arme Kind mit [Haut] und Haar;`,
	classifierNotes:
		"This line invites a literal body-part reading because the child is actually burning, but the fixed phrase mit Haut und Haar is also the meaning-bearing unit meaning wholly or completely. I therefore attached Haut to the idiom rather than to the standalone noun lexeme.",
} as const satisfies AttestedSelection;
