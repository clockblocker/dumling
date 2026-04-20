import type { OrthographicStatus } from "../../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../../concrete-language-types";
import type { ValueOf } from "../../../shared";

export type EnPhrasemeLemmaBySubKind = LemmaByKindForLanguage<"en">["Phraseme"];
export type EnDiscourseFormulaInherentFeatures =
	EnPhrasemeLemmaBySubKind["DiscourseFormula"]["inherentFeatures"];

export type EnPhrasemeLemmaUnion = ValueOf<EnPhrasemeLemmaBySubKind>;

export type EnPhrasemeLemmaSurfaceBySubKind =
	SurfaceByKindForLanguage<"en">["Lemma"]["Phraseme"];

export type EnPhrasemeLemmaSurfaceUnion = ValueOf<EnPhrasemeLemmaSurfaceBySubKind>;

export type EnPhrasemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"en">[OS]["Lemma"]["Phraseme"];

export type EnPhrasemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnPhrasemeLemmaSelectionBySubKind<OS>>;
