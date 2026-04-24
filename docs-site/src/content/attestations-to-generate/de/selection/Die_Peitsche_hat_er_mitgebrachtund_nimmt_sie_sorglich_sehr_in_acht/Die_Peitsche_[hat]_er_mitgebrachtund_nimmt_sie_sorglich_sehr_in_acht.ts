import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "hat",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "hat",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Ind",
			number: "Sing",
			person: "3",
			tense: "Pres",
			verbForm: "Fin",
		},
		lemma: {
			language: "de",
			canonicalLemma: "haben",
			lemmaKind: "Lexeme",
			lemmaSubKind: "AUX",
			inherentFeatures: {},
			meaningInEmojis: "🧺",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "AUX">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Die Peitsche [hat] er mitgebracht
und nimmt sie sorglich sehr in acht.`,
	classifierNotes:
		"Hat is the present finite auxiliary in the perfect construction hat mitgebracht, not a lexical possession verb here.",
} as const satisfies AttestedSelection;
