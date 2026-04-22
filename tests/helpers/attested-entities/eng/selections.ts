import type { Selection } from "../../../../src/types";
import {
	englishGiveUpInflectionSurface,
	englishWalkCitationSurface,
	englishWalkInflectionSurface,
} from "./surfaces";

// Attestation: "They [walk] home together."
export const englishWalkStandardFullSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: englishWalkInflectionSurface,
} satisfies Selection<"en", "Standard", "Inflection", "Lexeme", "VERB">;

// Attestation: "They [walk] home together."
export const englishWalkCitationSelection = {
	language: "en",
	orthographicStatus: "Standard",
	selectionCoverage: "Full",
	spelledSelection: "walk",
	spellingRelation: "Canonical",
	surface: englishWalkCitationSurface,
} satisfies Selection<"en", "Standard", "Citation", "Lexeme", "VERB">;

// Attestation: "Mark gvae [up] on it."
export const englishGiveUpTypoPartialUpSelection = {
	language: "en",
	orthographicStatus: "Typo",
	selectionCoverage: "Partial",
	spelledSelection: "up",
	spellingRelation: "Canonical",
	surface: englishGiveUpInflectionSurface,
} satisfies Selection<"en", "Typo", "Inflection", "Lexeme", "VERB">;

// Attestation: "Mark [gvae] up on it."
export const englishGiveUpTypoPartialGvaeSelection = {
	language: "en",
	orthographicStatus: "Typo",
	selectionCoverage: "Partial",
	spelledSelection: "gvae",
	spellingRelation: "Variant",
	surface: englishGiveUpInflectionSurface,
} satisfies Selection<"en", "Typo", "Inflection", "Lexeme", "VERB">;
