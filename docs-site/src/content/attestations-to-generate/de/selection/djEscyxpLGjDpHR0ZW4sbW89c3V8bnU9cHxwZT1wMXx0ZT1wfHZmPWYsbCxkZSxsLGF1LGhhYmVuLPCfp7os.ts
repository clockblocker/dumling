import type { Selection } from "dumling/types";

export const deSelection023 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "hätten",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "hätten",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			mood: "Sub",
			number: "Plur",
			person: "1",
			tense: "Past",
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
	order: 222,
	selection: deSelection023,
	sentenceMarkdown: "Wir **hätten** gern mehr Zeit.",
	title: "Hätten: subjunctive auxiliary",
} as const;
