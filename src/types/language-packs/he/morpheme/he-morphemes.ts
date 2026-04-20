import type { OrthographicStatus } from "../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../concrete-language-types";
import type { ValueOf } from "../../shared";

export type HeMorphemeLemmaBySubKind = LemmaByKindForLanguage<"he">["Morpheme"];

export type HeMorphemeLemmaUnion = ValueOf<HeMorphemeLemmaBySubKind>;

export type HeMorphemeLemmaSurfaceBySubKind =
	SurfaceByKindForLanguage<"he">["Lemma"]["Morpheme"];

export type HeMorphemeLemmaSurfaceUnion =
	ValueOf<HeMorphemeLemmaSurfaceBySubKind>;

export type HeMorphemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"he">[OS]["Lemma"]["Morpheme"];

export type HeMorphemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<HeMorphemeLemmaSelectionBySubKind<OS>>;
