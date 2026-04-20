import type { OrthographicStatus } from "../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../concrete-language-types";
import type { ValueOf } from "../../shared";

export type DeLexemeLemmaBySubKind = LemmaByKindForLanguage<"de">["Lexeme"];

export type DeLexemeLemma = ValueOf<DeLexemeLemmaBySubKind>;

export type DeLemmaLexemeSurfaceBySubKind =
	SurfaceByKindForLanguage<"de">["Lemma"]["Lexeme"];

export type DeLemmaLexemeSurface = ValueOf<DeLemmaLexemeSurfaceBySubKind>;

export type DeInflectionLexemeSurfaceBySubKind =
	SurfaceByKindForLanguage<"de">["Inflection"]["Lexeme"];

export type DeInflectableLexemeSubKind =
	keyof DeInflectionLexemeSurfaceBySubKind;
export type DeInflectionLexemeSurface =
	ValueOf<DeInflectionLexemeSurfaceBySubKind>;
export type DeLexemeSurface = DeLemmaLexemeSurface | DeInflectionLexemeSurface;

export type DeLemmaLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"de">[OS]["Lemma"]["Lexeme"];

export type DeLemmaLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DeLemmaLexemeSelectionBySubKind<OS>>;

export type DeInflectionLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"de">[OS]["Inflection"]["Lexeme"];

export type DeInflectionLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DeInflectionLexemeSelectionBySubKind<OS>>;

export type DeLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLemmaLexemeSelection<OS> | DeInflectionLexemeSelection<OS>;
