import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection020 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "erinnert",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "erinnert",
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
			canonicalLemma: "sich erinnern",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				lexicallyReflexive: "Yes",
				hasGovPrep: "an",
			},
			meaningInEmojis: "🧠",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: deSelection020,
	sentenceMarkdown: "Sie [erinnert] sich an den Geruch.",
	title: "Erinnert: reflexive verb",
} as const satisfies AttestedSelection;
