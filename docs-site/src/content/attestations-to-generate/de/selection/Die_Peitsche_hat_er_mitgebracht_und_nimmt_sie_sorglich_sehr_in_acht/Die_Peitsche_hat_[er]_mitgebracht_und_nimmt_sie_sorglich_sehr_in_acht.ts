import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "er",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "er",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Nom",
			gender: "Masc",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "er",
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				person: "3",
				pronType: "Prs",
			},
			meaningInEmojis: "👦",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "PRON">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Die Peitsche hat [er] mitgebracht
und nimmt sie sorglich sehr in acht.`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
