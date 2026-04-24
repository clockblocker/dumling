import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection027 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "besseren",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "besseren",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Acc",
			degree: "Cmp",
			gender: "Masc",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "gut",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "📈",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "ADJ">;

export const attestation = {
	selection: deSelection027,
	sentenceMarkdown: "Ich suche einen [besseren] Ansatz.",
	title: "Besseren: comparative adjective",
} as const satisfies AttestedSelection;
