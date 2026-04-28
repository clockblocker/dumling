import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	spelledSelection: "ungelöst",

	surface: {
		language: "de",
		normalizedFullSurface: "ungelöst",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "ungelöst",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "🧩",
		},
	},
} satisfies Selection<"de", "Citation", "Lexeme", "ADJ">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Die Aufgabe bleibt [ungelöst].",
	classifierNotes:
		"I treated ungelöst as a lexicalized adjective rather than as the participle of lösen. In Die Aufgabe bleibt ungelöst, it functions as a predicative state adjective, and with no overt adjectival inflection the surface is stored as citation-shaped ADJ.",
	isVerified: true,
} as const satisfies AttestedSelection;
