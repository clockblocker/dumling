import type { OrthographicStatus } from "../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../concrete-language-types";
import type { ValueOf } from "../../shared";

export type DeMorphemeLemmaBySubKind = LemmaByKindForLanguage<"de">["Morpheme"];
export type DePrefixMorphemeInherentFeatures =
	DeMorphemeLemmaBySubKind["Prefix"]["inherentFeatures"];

export type DeMorphemeLemmaUnion = ValueOf<DeMorphemeLemmaBySubKind>;

export type DeMorphemeLemmaSurfaceBySubKind =
	SurfaceByKindForLanguage<"de">["Lemma"]["Morpheme"];

export type DeMorphemeLemmaSurfaceUnion = ValueOf<DeMorphemeLemmaSurfaceBySubKind>;

export type DeMorphemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"de">[OS]["Lemma"]["Morpheme"];

export type DeMorphemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DeMorphemeLemmaSelectionBySubKind<OS>>;
