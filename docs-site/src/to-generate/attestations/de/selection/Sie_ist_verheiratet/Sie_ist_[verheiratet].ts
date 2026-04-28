import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	spelledSelection: "verheiratet",

	surface: {
		language: "de",
		normalizedFullSurface: "verheiratet",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "verheiratet",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "💍",
		},
	},
} satisfies Selection<"de", "Citation", "Lexeme", "ADJ">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Sie ist [verheiratet].",
	classifierNotes:
		"Verheiratet is treated here as a lexicalized predicative adjective rather than as the participle of verheiraten. In this bare complement of ist, the project rulebook marks sie ist verheiratet as an explicit ADJ override, so the form is stored as a citation-shaped adjective.",
	isVerified: true,
} as const satisfies AttestedSelection;
