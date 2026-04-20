import type { OrthographicStatus } from "../../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../../concrete-language-types";
import type { ValueOf } from "../../../shared";

export type EnLexemeLemmaBySubKind = LemmaByKindForLanguage<"en">["Lexeme"];

export type EnLexemeLemma = ValueOf<EnLexemeLemmaBySubKind>;

export type EnLemmaLexemeSurfaceBySubKind =
	SurfaceByKindForLanguage<"en">["Lemma"]["Lexeme"];

export type EnLemmaLexemeSurface = ValueOf<EnLemmaLexemeSurfaceBySubKind>;

export type EnInflectionLexemeSurfaceBySubKind =
	SurfaceByKindForLanguage<"en">["Inflection"]["Lexeme"];

export type EnInflectableLexemeSubKind =
	keyof EnInflectionLexemeSurfaceBySubKind;
export type EnInflectionLexemeSurface =
	ValueOf<EnInflectionLexemeSurfaceBySubKind>;
export type EnLexemeSurface = EnLemmaLexemeSurface | EnInflectionLexemeSurface;

export type EnLemmaLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"en">[OS]["Lemma"]["Lexeme"];

export type EnLemmaLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnLemmaLexemeSelectionBySubKind<OS>>;

export type EnInflectionLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"en">[OS]["Inflection"]["Lexeme"];

export type EnInflectionLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnInflectionLexemeSelectionBySubKind<OS>>;

export type EnLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnLemmaLexemeSelection<OS> | EnInflectionLexemeSelection<OS>;
