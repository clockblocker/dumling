import type { AttestedSelection, Selection } from "dumling/types";

export const deSelection030 = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "deutschsprachigen",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "deutschsprachigen",
		surfaceKind: "Inflection",
		inflectionalFeatures: {
			case: "Nom",
			degree: "Pos",
			number: "Plur",
		},
		lemma: {
			language: "de",
			canonicalLemma: "deutschsprachig",
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {},
			meaningInEmojis: "🗣️",
		},
	},
} satisfies Selection<"de", "Standard", "Inflection", "Lexeme", "ADJ">;

export const attestation = {
	selection: deSelection030,
	sentenceMarkdown: "Viele [deutschsprachigen] Quellen fehlen noch.",
	title: "Deutschsprachigen: nominal-looking adjective",
} as const satisfies AttestedSelection;
