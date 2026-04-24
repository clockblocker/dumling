import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection015 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Namen",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Namen",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Dat",
			number: "Sing",
		},
		lemma: {
			language: "de",
			canonicalLemma: "Name",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🏷️",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection015,
	sentenceMarkdown: "Unter falschem [Namen] mietete er das Zimmer.",
	title: "Namen: weak noun dative singular",
} as const satisfies AttestedSelection;
