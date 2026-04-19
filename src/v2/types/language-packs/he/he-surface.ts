import type { ValueOf } from "./shared";
import type {
	HeInflectionLexemeSurface,
	HeInflectionLexemeSurfaceBySubKind,
	HeLemmaLexemeSurface,
	HeLemmaLexemeSurfaceBySubKind,
} from "./lexeme/he-lexemes";
import type {
	HeMorphemeLemmaSurfaceBySubKind,
	HeMorphemeLemmaSurfaceUnion,
} from "./morpheme/he-morphemes";
import type {
	HePhrasemeLemmaSurfaceBySubKind,
	HePhrasemeLemmaSurfaceUnion,
} from "./phraseme/he-phrasemes";

export type HeLemmaSurfaceByKind = {
	Lexeme: HeLemmaLexemeSurfaceBySubKind;
	Morpheme: HeMorphemeLemmaSurfaceBySubKind;
	Phraseme: HePhrasemeLemmaSurfaceBySubKind;
};

export type HeInflectionSurfaceByKind = {
	Lexeme: HeInflectionLexemeSurfaceBySubKind;
};

export type HeSurfaceByKind = {
	Inflection: HeInflectionSurfaceByKind;
	Lemma: HeLemmaSurfaceByKind;
};

export type HeLemmaSurface =
	| HeLemmaLexemeSurface
	| HeMorphemeLemmaSurfaceUnion
	| HePhrasemeLemmaSurfaceUnion;
export type HeInflectionSurface = HeInflectionLexemeSurface;
export type HeSurface = HeLemmaSurface | HeInflectionSurface;
export type HeSurfaceKind = keyof HeSurfaceByKind;
export type HeLemmaSurfaceKind = ValueOf<{
	Lexeme: keyof HeLemmaLexemeSurfaceBySubKind;
	Morpheme: keyof HeMorphemeLemmaSurfaceBySubKind;
	Phraseme: keyof HePhrasemeLemmaSurfaceBySubKind;
}>;
