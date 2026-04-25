import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "ward",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "ward",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Ind",
			number: "Sing",
			person: "3",
			tense: "Past",
			verbForm: "Fin",
		},
		lemma: {
			language: "de",
			canonicalLemma: "werden",
			lemmaKind: "Lexeme",
			lemmaSubKind: "AUX",
			inherentFeatures: {},
			meaningInEmojis: "🔄",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "AUX">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Jetzt schien die Sonne gar zu sehr,
da [ward] ihm sein Gewehr zu schwer.`,
	classifierNotes:
		"I treated `ward` as the archaic 3sg past finite of `werden`. I went with AUX rather than VERB because this is a copular `become` use with the predicative adjective phrase `zu schwer`, but that AUX/VERB boundary is the only real uncertainty here.",
} as const satisfies AttestedSelection;
