import type { ValueOf } from "../shared";
import type {
	DeInflectionLexemeSurface,
	DeInflectionLexemeSurfaceBySubKind,
	DeLemmaLexemeSurface,
	DeLemmaLexemeSurfaceBySubKind,
} from "./lexeme/de-lexemes";
import type {
	DeMorphemeLemmaSurfaceBySubKind,
	DeMorphemeLemmaSurfaceUnion,
} from "./morpheme/de-morphemes";
import type {
	DePhrasemeLemmaSurfaceBySubKind,
	DePhrasemeLemmaSurfaceUnion,
} from "./phraseme/de-phrasemes";

export type DeLemmaSurfaceByKind = {
	Lexeme: DeLemmaLexemeSurfaceBySubKind;
	Morpheme: DeMorphemeLemmaSurfaceBySubKind;
	Phraseme: DePhrasemeLemmaSurfaceBySubKind;
};

export type DeInflectionSurfaceByKind = {
	Lexeme: DeInflectionLexemeSurfaceBySubKind;
};

export type DeSurfaceByKind = {
	Inflection: DeInflectionSurfaceByKind;
	Lemma: DeLemmaSurfaceByKind;
};

export type DeLemmaSurface =
	| DeLemmaLexemeSurface
	| DeMorphemeLemmaSurfaceUnion
	| DePhrasemeLemmaSurfaceUnion;
export type DeInflectionSurface = DeInflectionLexemeSurface;
export type DeSurface = DeLemmaSurface | DeInflectionSurface;
export type DeSurfaceKind = keyof DeSurfaceByKind;
export type DeLemmaSurfaceKind = ValueOf<{
	Lexeme: keyof DeLemmaLexemeSurfaceBySubKind;
	Morpheme: keyof DeMorphemeLemmaSurfaceBySubKind;
	Phraseme: keyof DePhrasemeLemmaSurfaceBySubKind;
}>;
