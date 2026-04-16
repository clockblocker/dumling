/** biome-ignore-all lint/correctness/noUnusedVariables: README example file */
import type { Selection } from "../../src";

// README_BLOCK:core-simple-selection:start
const giveUpPartialSelection = {
	language: "English",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "up",
	spellingRelation: "Canonical",
	surface: {
		discriminators: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
		},
		inflectionalFeatures: {
			tense: "Past",
			verbForm: "Fin",
		},
		language: "English",
		normalizedFullSurface: "gave up",
		surfaceKind: "Inflection",
		target: {
			canonicalLemma: "give up",
			inherentFeatures: {
				phrasal: "Yes",
			},
			language: "English",
			lemmaKind: "Lexeme",
			meaningInEmojis: "🏳️",
			pos: "VERB",
		},
	},
} satisfies Selection<"English", "Standard", "Inflection", "Lexeme", "VERB">;
// README_BLOCK:core-simple-selection:end
