import { z } from "zod/v3";

const languageValues = ["Universal", "en", "de", "he"] as const;

export const Language = z.enum(languageValues);
export type Language = z.infer<typeof Language>;

const lemmaKindValues = ["Phraseme", "Lexeme", "Morpheme"] as const;

export const LemmaKind = z.enum(lemmaKindValues);
export type LemmaKind = z.infer<typeof LemmaKind>;

const surfaceKindValues = ["Lemma", "Inflection"] as const;

export const SurfaceKind = z.enum(surfaceKindValues);
export type SurfaceKind = z.infer<typeof SurfaceKind>;

const orthographicStatusValues = ["Standard", "Typo"] as const;

export const OrthographicStatus = z.enum(orthographicStatusValues);
export type OrthographicStatus = z.infer<typeof OrthographicStatus>;

const selectionCoverageValues = ["Full", "Partial"] as const;

export const SelectionCoverage = z.enum(selectionCoverageValues);
export type SelectionCoverage = z.infer<typeof SelectionCoverage>;

const spellingRelationValues = ["Canonical", "Variant"] as const;

export const SpellingRelation = z.enum(spellingRelationValues);
export type SpellingRelation = z.infer<typeof SpellingRelation>;

const openClassPosValues = [
	"ADJ",
	"ADV",
	"INTJ",
	"NOUN",
	"PROPN",
	"VERB",
] as const;

const closedClassPosValues = [
	"ADP",
	"AUX",
	"CCONJ",
	"DET",
	"NUM",
	"PART",
	"PRON",
	"SCONJ",
] as const;

const otherPosValues = ["PUNCT", "SYM", "X"] as const;
const posValues = [
	...openClassPosValues,
	...closedClassPosValues,
	...otherPosValues,
] as const;

export const Pos = z.enum(posValues);
export type Pos = z.infer<typeof Pos>;

const phrasemeKindValues = [
	"DiscourseFormula",
	"Aphorism",
	"Proverb",
	"Idiom",
] as const;

export const PhrasemeKind = z.enum(phrasemeKindValues);
export type PhrasemeKind = z.infer<typeof PhrasemeKind>;

const morphemeKindValues = [
	"Root",
	"Prefix",
	"Suffix",
	"Suffixoid",
	"Infix",
	"Circumfix",
	"Interfix",
	"Transfix",
	"Clitic",
	"ToneMarking",
	"Duplifix",
] as const;

export const MorphemeKind = z.enum(morphemeKindValues);
export type MorphemeKind = z.infer<typeof MorphemeKind>;

export const LexemeSubKind = Pos;
export type LexemeSubKind = Pos;

export const PhrasemeSubKind = PhrasemeKind;
export type PhrasemeSubKind = PhrasemeKind;

export const MorphemeSubKind = MorphemeKind;
export type MorphemeSubKind = MorphemeKind;

const lemmaSubKindValues = [
	...posValues,
	...phrasemeKindValues,
	...morphemeKindValues,
] as const;

export const LemmaSubKind = z.enum(lemmaSubKindValues);
export type LemmaSubKind = z.infer<typeof LemmaSubKind>;
