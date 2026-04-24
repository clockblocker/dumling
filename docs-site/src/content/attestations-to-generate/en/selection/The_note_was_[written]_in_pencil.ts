import type { AttestedSelection, Selection } from "dumling/types";

export const writtenPassiveParticipleSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "written",
	spellingRelation: "Canonical",
	surface: {
		language: "en",
		normalizedFullSurface: "written",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			verbForm: "Part",
			voice: "Pass",
		},
		lemma: {
			language: "en",
			canonicalLemma: "write",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "✍️",
		},
	},
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "VERB">;

export const attestation = {
	selection: writtenPassiveParticipleSelection,
	sentenceMarkdown: "The note was [written] in pencil.",
} as const satisfies AttestedSelection;
