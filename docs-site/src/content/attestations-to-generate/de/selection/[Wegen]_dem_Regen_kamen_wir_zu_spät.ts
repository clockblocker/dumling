import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection037 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Wegen",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "wegen",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "wegen",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {
				adpType: "Prep",
				governedCase: "Gen",
			},
			meaningInEmojis: "🌧️",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	selection: deSelection037,
	sentenceMarkdown: "[Wegen] dem Regen kamen wir zu spät.",
	title: "Wegen: genitive adposition in dative phrase",
} as const satisfies AttestedSelection;
