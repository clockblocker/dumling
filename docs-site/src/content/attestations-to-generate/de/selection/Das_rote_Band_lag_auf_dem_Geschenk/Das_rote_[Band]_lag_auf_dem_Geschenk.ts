import type { AttestedSelection, Selection } from "dumling/types";

const deSelection002 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Band",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "Band",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "Band",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: "Neut",
			},
			meaningInEmojis: "🎀",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: deSelection002,
	sentenceMarkdown: "Das rote [Band] lag auf dem Geschenk.",
	classifierNotes: "Band is the neuter ribbon or tape sense, kept separate from the music-group and book-volume senses by lexical features and emoji.",
	isVerified: true,
} as const satisfies AttestedSelection;
