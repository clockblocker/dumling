import type { AttestedSelection, Selection } from "dumling/types";

export const emailVariantSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "e-mail",
	spellingRelation: "Variant",
	surface: {
		language: "en",
		normalizedFullSurface: "e-mail",
		surfaceKind: "Citation",
		lemma: {
			language: "en",
			canonicalLemma: "email",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {},
			meaningInEmojis: "✉️",
		},
	},
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "NOUN">;

export const attestation = {
	selection: emailVariantSelection,
	sentenceMarkdown: "Send the [e-mail] before noon.",
	title: emailVariantSelection.surface.normalizedFullSurface,
} as const satisfies AttestedSelection;
