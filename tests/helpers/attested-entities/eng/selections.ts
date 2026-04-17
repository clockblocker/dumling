import type { KnownSelection, Selection } from "../../../../src";
import {
	englishGiveUpTypoInflectionSurface,
	englishWalkInflectionSurface,
	englishWalkLemmaSurface,
} from "./surfaces";

// Attestation: "They [walk] home together."
export const englishWalkStandardFullSelection = {
	language: "English",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: englishWalkInflectionSurface,
} satisfies KnownSelection<"English">;

// Attestation: "They [walk] home together."
export const englishWalkLemmaSelection = {
	language: "English",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: englishWalkLemmaSurface,
} satisfies Selection<"English", "Standard", "Lemma", "Lexeme", "VERB">;

// Attestation: "Mark gvae [up] on it."
export const englishGiveUpTypoPartialUpSelection = {
	language: "English",
	orthographicStatus: "Typo",
	selectionCoverage: "Partial",
	spelledSelection: "up",
	spellingRelation: "Canonical",
	surface: englishGiveUpTypoInflectionSurface,
} satisfies Selection<"English", "Typo", "Inflection", "Lexeme", "VERB">;

// Attestation: "Mark [gvae] up on it."
export const englishGiveUpTypoPartialGvaeSelection = {
	language: "English",
	orthographicStatus: "Typo",
	selectionCoverage: "Partial",
	spelledSelection: "gvae",
	spellingRelation: "Variant",
	surface: englishGiveUpTypoInflectionSurface,
} satisfies Selection<"English", "Typo", "Inflection", "Lexeme", "VERB">;
