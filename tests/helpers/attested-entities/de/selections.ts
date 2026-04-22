import type { Selection } from "../../../../src/types";
import { germanAufJedenFallLemma, germanBVGLemma } from "./lemmas";

// Attestation: "Ich komme [auf jeden Fall] morgen."
export const germanAufJedenFallDiscourseFormulaSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "auf jeden Fall",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "auf jeden Fall",
		surfaceKind: "Citation",
		lemma: germanAufJedenFallLemma,
	},
} satisfies Selection<
	"de",
	"Standard",
	"Citation",
	"Phraseme",
	"DiscourseFormula"
>;

// Attestation: "Ich komme auf [jeden Fall] morgen."
export const germanAufJedenFallPartialSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Partial",
	spelledSelection: "jeden Fall",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "auf jeden Fall",
		surfaceKind: "Citation",
		lemma: germanAufJedenFallLemma,
	},
} satisfies Selection<
	"de",
	"Standard",
	"Citation",
	"Phraseme",
	"DiscourseFormula"
>;

// Attestation: "In Berlin ... betreibt die [BVG] die U-Bahn Berlin ..."
export const germanBVGAbbreviationSelection = {
	language: "de",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "BVG",
	spellingRelation: "Canonical",
	surface: {
		language: "de",
		normalizedFullSurface: "BVG",
		surfaceKind: "Citation",
		lemma: germanBVGLemma,
	},
} satisfies Selection<"de", "Standard", "Citation", "Lexeme", "PROPN">;
