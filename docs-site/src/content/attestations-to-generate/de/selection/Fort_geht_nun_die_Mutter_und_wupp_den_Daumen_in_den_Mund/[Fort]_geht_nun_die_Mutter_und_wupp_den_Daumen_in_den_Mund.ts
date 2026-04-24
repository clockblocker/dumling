import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "Fort",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "fort",
		surfaceKind: "Citation",
		lemma: {
			language: "de",
			canonicalLemma: "fort",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADV",
			inherentFeatures: {},
			meaningInEmojis: "➡️",
		},
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "ADV">;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `[Fort] geht nun die Mutter und
wupp! den Daumen in den Mund.
`,
	classifierNotes:
		"Fort is taken as the directional adverb here. I considered a particle-like reading because it sits before geht in a motion expression, but dumling has no separate German directional-particle subtype for this use and the meaning remains adverbial.",
} as const satisfies AttestedSelection;
