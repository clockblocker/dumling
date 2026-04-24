import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection001 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Seen",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Seen",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Nom",
			number: "Plur",
		},
		lemma: {
			language: "de",
			canonicalLemma: "See",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Masc",
			},
			meaningInEmojis: "🌊",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection001,
	sentenceMarkdown: "Auf der Karte sind drei [Seen] eingezeichnet.",
	title: "Seen: plural of See",
} as const satisfies AttestedSelection;
