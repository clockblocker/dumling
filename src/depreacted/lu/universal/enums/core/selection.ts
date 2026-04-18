import { z } from "zod/v3";

// -- OrthographicStatus --

const orthographicStatusValues = [
	"Standard", // Accepted spelling of a known surface
	"Typo", // Misspelling mapped to a known surface
	"Unknown", // No known surface match
] as const;

export const DeprecatedOrthographicStatus = z.enum(orthographicStatusValues);
export type DeprecatedOrthographicStatus = z.infer<typeof DeprecatedOrthographicStatus>;

// -- SpellingRelation --

// This is selection-level spelling metadata, not the UD Variant feature.
const spellingRelationValues = ["Canonical", "Variant"] as const;

export const DeprecatedSpellingRelation = z.enum(spellingRelationValues);
export type DeprecatedSpellingRelation = z.infer<typeof DeprecatedSpellingRelation>;

// -- SelectionCoverage --

const selectionCoverageValues = ["Full", "Partial"] as const;

export const DeprecatedSelectionCoverage = z.enum(selectionCoverageValues);
export type DeprecatedSelectionCoverage = z.infer<typeof DeprecatedSelectionCoverage>;

// -- SurfaceKind --

const surfaceKinds = ["Inflection", "Lemma"] as const;

export const DeprecatedSurfaceKind = z.enum(surfaceKinds);
export type DeprecatedSurfaceKind = z.infer<typeof DeprecatedSurfaceKind>;

// -- LemmaKind --

const lemmaKinds = ["Phraseme", "Lexeme", "Morpheme"] as const;

export const DeprecatedLemmaKind = z.enum(lemmaKinds);
export type DeprecatedLemmaKind = z.infer<typeof DeprecatedLemmaKind>;
