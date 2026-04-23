import type { Selection } from "dumling/types";

export const deSelection035 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "keinem",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "keinem",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Dat",
			gender: "Neut",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "kein",
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				pronType: "Neg",
			},
			meaningInEmojis: "🚫",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "DET">;

export const attestation = {
	order: 234,
	selection: deSelection035,
	sentenceMarkdown: "Mit **keinem** Wort erwähnte sie den Plan.",
	title: "Keinem: negative determiner",
} as const;
