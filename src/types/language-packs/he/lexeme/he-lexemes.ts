import type { OrthographicStatus } from "../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../concrete-language-types";
import type { ValueOf } from "../../shared";

export type HeLexemeLemmaBySubKind = LemmaByKindForLanguage<"he">["Lexeme"];

export type HeLexemeLemma = ValueOf<HeLexemeLemmaBySubKind>;

export type HeLemmaLexemeSurfaceBySubKind =
	SurfaceByKindForLanguage<"he">["Lemma"]["Lexeme"];

export type HeLemmaLexemeSurface = ValueOf<HeLemmaLexemeSurfaceBySubKind>;

export type HeInflectionLexemeSurfaceBySubKind =
	SurfaceByKindForLanguage<"he">["Inflection"]["Lexeme"];

export type HeInflectableLexemeSubKind =
	keyof HeInflectionLexemeSurfaceBySubKind;
export type HeInflectionLexemeSurface =
	ValueOf<HeInflectionLexemeSurfaceBySubKind>;
export type HeLexemeSurface = HeLemmaLexemeSurface | HeInflectionLexemeSurface;

export type HeLemmaLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"he">[OS]["Lemma"]["Lexeme"];

export type HeLemmaLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<HeLemmaLexemeSelectionBySubKind<OS>>;

export type HeInflectionLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"he">[OS]["Inflection"]["Lexeme"];

export type HeInflectionLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<HeInflectionLexemeSelectionBySubKind<OS>>;

export type HeLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeLemmaLexemeSelection<OS> | HeInflectionLexemeSelection<OS>;
