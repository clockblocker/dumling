import type { Selection } from "dumling/types";

export const deSelection038 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "entlang",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "entlang",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "entlang",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {
				adpType: "Post",
				governedCase: "Acc",
			},
			meaningInEmojis: "🛤️",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "ADP">;

export const attestation = {
	order: 237,
	selection: deSelection038,
	sentenceMarkdown: "Wir liefen den Fluss **entlang**.",
	title: "Entlang: postposition",
} as const;
