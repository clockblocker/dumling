import type { Selection } from "dumling/types";

export const hashSymbolVariantSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "#",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "#",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "number sign",
			lemmaKind: "Lexeme",
			lemmaSubKind: "SYM",
			inherentFeatures: {},
			meaningInEmojis: "#️⃣",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "SYM">;

export const attestation = {
	order: 126,
	selection: hashSymbolVariantSelection,
	sentenceMarkdown: "Tag the issue with **#** before the number.",
} as const;
