import type { OrthographicStatus } from "../../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../../concrete-language-types";
import type { ValueOf } from "../../../shared";

export type EnMorphemeLemmaBySubKind = LemmaByKindForLanguage<"en">["Morpheme"];

export type EnMorphemeLemmaUnion = ValueOf<EnMorphemeLemmaBySubKind>;

export type EnMorphemeLemmaSurfaceBySubKind =
	SurfaceByKindForLanguage<"en">["Lemma"]["Morpheme"];

export type EnMorphemeLemmaSurfaceUnion = ValueOf<EnMorphemeLemmaSurfaceBySubKind>;

export type EnMorphemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"en">[OS]["Lemma"]["Morpheme"];

export type EnMorphemeLemmaSelectionUnion<
    OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnMorphemeLemmaSelectionBySubKind<OS>>;
