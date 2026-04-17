import { z } from "zod/v3";

// -- OrthographicStatus --

const orthographicStatusValues = [
	"Standard", // Accepted spelling of a known surface
	"Typo", // Misspelling mapped to a known surface
	"Unknown", // No known surface match
] as const;

export const OrthographicStatus = z.enum(orthographicStatusValues);
export type OrthographicStatus = z.infer<typeof OrthographicStatus>;

// -- SpellingRelation --

// This is selection-level spelling metadata, not the UD Variant feature.
const spellingRelationValues = ["Canonical", "Variant"] as const;

export const SpellingRelation = z.enum(spellingRelationValues);
export type SpellingRelation = z.infer<typeof SpellingRelation>;

// -- SelectionCoverage --

const selectionCoverageValues = ["Full", "Partial"] as const;

export const SelectionCoverage = z.enum(selectionCoverageValues);
export type SelectionCoverage = z.infer<typeof SelectionCoverage>;

// -- SurfaceKind --

const surfaceKinds = ["Inflection", "Lemma"] as const;

export const SurfaceKind = z.enum(surfaceKinds);
export type SurfaceKind = z.infer<typeof SurfaceKind>;

// -- LemmaKind --

const lemmaKinds = ["Phraseme", "Lexeme", "Morpheme"] as const;

export const LemmaKind = z.enum(lemmaKinds);
export type LemmaKind = z.infer<typeof LemmaKind>;
