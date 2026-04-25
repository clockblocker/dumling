import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "zu",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "um zu",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "um zu",
			lemmaKind: "Construction",
			lemmaSubKind: "PairedFrame",
			inherentFeatures: {},
			meaningInEmojis: "🎯",
		},
	},
} satisfies Selection<
	"de",
	"Standard",
	"Citation",
	"Construction",
	"PairedFrame"
>;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Ich gehe Tomaten kaufen, um einen Salat [zu] machen.",
	classifierNotes:
		"This is a partial selection of the learner-facing Construction/PairedFrame `um zu`; the current selection format still anchors only the highlighted token, but the lexical identity now stays with the paired frame rather than with standalone PART `zu`.",
} as const satisfies AttestedSelection;
