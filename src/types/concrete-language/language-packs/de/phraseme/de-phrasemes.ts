import type { OrthographicStatus } from "../../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../../concrete-language-types";
import type { ValueOf } from "../../../shared";

export type DePhrasemeLemmaBySubKind = LemmaByKindForLanguage<"de">["Phraseme"];
export type DeDiscourseFormulaInherentFeatures =
	DePhrasemeLemmaBySubKind["DiscourseFormula"]["inherentFeatures"];

export type DePhrasemeLemmaUnion = ValueOf<DePhrasemeLemmaBySubKind>;

export type DePhrasemeLemmaSurfaceBySubKind =
	SurfaceByKindForLanguage<"de">["Lemma"]["Phraseme"];

export type DePhrasemeLemmaSurfaceUnion = ValueOf<DePhrasemeLemmaSurfaceBySubKind>;

export type DePhrasemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"de">[OS]["Lemma"]["Phraseme"];

export type DePhrasemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DePhrasemeLemmaSelectionBySubKind<OS>>;
