/** biome-ignore-all lint/correctness/noUnusedVariables: Demo */
import type { Lemma, Selection, Surface } from "../index";

type Test = Selection<"English", "Standard", "Inflection", "Lexeme", "ADJ">;
type asdas = Surface<"English", "Inflection", "Lexeme", "ADJ">;

type Test1 = Lemma<"German", "Phraseme", "Idiom">; // Pass auf dich auf
//
type Test2 = Lemma<"German", "Lexeme", "VERB">;
type Test3 = Lemma<"German", "Lexeme", "CCONJ">;

// Selection -- могут быть ошибки и можеь быть выделено не все слвооа
// Surface -- без ошибок, вся конструкция, но не в начально форме
// Lemma -- без ошибок, вся конструкция в началотй форме

const simpleWalkSelection = {
	language: "English",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: {
		inflectionalFeatures: {
			tense: "Pres",
			verbForm: "Fin",
		},
		language: "English",
		normalizedFullSurface: "walk",
		surfaceKind: "Inflection",
		lemma: {
			canonicalLemma: "walk",
			inherentFeatures: {},
			language: "English",
			lemmaKind: "Lexeme",
			meaningInEmojis: "🚶",
			pos: "VERB",
		},
	},
} satisfies Selection<"English", "Standard", "Inflection", "Lexeme", "VERB">;
