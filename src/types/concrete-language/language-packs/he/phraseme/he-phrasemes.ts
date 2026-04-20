import type { OrthographicStatus } from "../../../../core/enums";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../../../concrete-language-types";
import type { ValueOf } from "../../../shared";

export type HePhrasemeLemmaBySubKind = LemmaByKindForLanguage<"he">["Phraseme"];

export type HePhrasemeLemmaUnion = ValueOf<HePhrasemeLemmaBySubKind>;

export type HePhrasemeLemmaSurfaceBySubKind =
	SurfaceByKindForLanguage<"he">["Lemma"]["Phraseme"];

export type HePhrasemeLemmaSurfaceUnion =
	ValueOf<HePhrasemeLemmaSurfaceBySubKind>;

export type HePhrasemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<"he">[OS]["Lemma"]["Phraseme"];

export type HePhrasemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<HePhrasemeLemmaSelectionBySubKind<OS>>;
