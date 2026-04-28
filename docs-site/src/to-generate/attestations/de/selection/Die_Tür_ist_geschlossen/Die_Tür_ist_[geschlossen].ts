import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	spelledSelection: "geschlossen",

	surface: {
		language: "de",
		normalizedFullSurface: "geschlossen",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "geschlossen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "🔒",
		},
	},
} satisfies Selection<"de", "Citation", "Lexeme", "ADJ">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Die Tür ist [geschlossen].",
	classifierNotes:
		"Geschlossen is treated here as a lexicalized predicative adjective rather than as the participle of schließen. The repo's German verb rule explicitly lists die Tür ist geschlossen as an ADJ override, so the bare complement of ist is stored as a citation-shaped adjective.",
	isVerified: true,
} as const satisfies AttestedSelection;
