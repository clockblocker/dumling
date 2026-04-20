import type { ValueOf } from "../shared";
import type {
	EnInflectionLexemeSurface,
	EnInflectionLexemeSurfaceBySubKind,
	EnLemmaLexemeSurface,
	EnLemmaLexemeSurfaceBySubKind,
} from "./lexeme/en-lexemes";
import type {
	EnMorphemeLemmaSurfaceBySubKind,
	EnMorphemeLemmaSurfaceUnion,
} from "./morpheme/en-morphemes";
import type {
	EnPhrasemeLemmaSurfaceBySubKind,
	EnPhrasemeLemmaSurfaceUnion,
} from "./phraseme/en-phrasemes";

export type EnLemmaSurfaceByKind = {
	Lexeme: EnLemmaLexemeSurfaceBySubKind;
	Morpheme: EnMorphemeLemmaSurfaceBySubKind;
	Phraseme: EnPhrasemeLemmaSurfaceBySubKind;
};

export type EnInflectionSurfaceByKind = {
	Lexeme: EnInflectionLexemeSurfaceBySubKind;
};

export type EnSurfaceByKind = {
	Inflection: EnInflectionSurfaceByKind;
	Lemma: EnLemmaSurfaceByKind;
};

export type EnLemmaSurface =
	| EnLemmaLexemeSurface
	| EnMorphemeLemmaSurfaceUnion
	| EnPhrasemeLemmaSurfaceUnion;

export type EnInflectionSurface = EnInflectionLexemeSurface;

export type EnSurface = EnLemmaSurface | EnInflectionSurface;

export type EnSurfaceKind = keyof EnSurfaceByKind;

export type EnLemmaSurfaceKind = ValueOf<{
	Lexeme: keyof EnLemmaLexemeSurfaceBySubKind;
	Morpheme: keyof EnMorphemeLemmaSurfaceBySubKind;
	Phraseme: keyof EnPhrasemeLemmaSurfaceBySubKind;
}>;
