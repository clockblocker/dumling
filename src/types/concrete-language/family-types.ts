import type { LemmaKind, OrthographicStatus } from "../core/enums";
import type {
	ConcreteLanguage,
	LanguagePackFeatureRegistry,
} from "./features/feature-registry";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "./concrete-language-types";
import type { ValueOf } from "./shared";

export type FamilyKindForLanguage<L extends ConcreteLanguage> = Extract<
	keyof LanguagePackFeatureRegistry[L],
	LemmaKind
>;

export type InflectableFamilyKindForLanguage<L extends ConcreteLanguage> = Extract<
	keyof SurfaceByKindForLanguage<L>["Inflection"],
	FamilyKindForLanguage<L>
>;

export type FamilyLemmaBySubKind<
	L extends ConcreteLanguage,
	LK extends FamilyKindForLanguage<L>,
> = LemmaByKindForLanguage<L>[LK];

export type FamilyLemmaUnion<
	L extends ConcreteLanguage,
	LK extends FamilyKindForLanguage<L>,
> = ValueOf<FamilyLemmaBySubKind<L, LK>>;

export type FamilyLemmaSurfaceBySubKind<
	L extends ConcreteLanguage,
	LK extends FamilyKindForLanguage<L>,
> = SurfaceByKindForLanguage<L>["Lemma"][LK];

export type FamilyLemmaSurfaceUnion<
	L extends ConcreteLanguage,
	LK extends FamilyKindForLanguage<L>,
> = ValueOf<FamilyLemmaSurfaceBySubKind<L, LK>>;

export type FamilyLemmaSelectionBySubKind<
	L extends ConcreteLanguage,
	LK extends FamilyKindForLanguage<L>,
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<L>[OS]["Lemma"][LK];

export type FamilyLemmaSelectionUnion<
	L extends ConcreteLanguage,
	LK extends FamilyKindForLanguage<L>,
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<FamilyLemmaSelectionBySubKind<L, LK, OS>>;

export type FamilyInflectionSurfaceBySubKind<
	L extends ConcreteLanguage,
	LK extends InflectableFamilyKindForLanguage<L>,
> = SurfaceByKindForLanguage<L>["Inflection"][LK];

export type FamilyInflectableSubKind<
	L extends ConcreteLanguage,
	LK extends InflectableFamilyKindForLanguage<L>,
> = keyof FamilyInflectionSurfaceBySubKind<L, LK>;

export type FamilyInflectionSurfaceUnion<
	L extends ConcreteLanguage,
	LK extends InflectableFamilyKindForLanguage<L>,
> = ValueOf<FamilyInflectionSurfaceBySubKind<L, LK>>;

export type FamilyInflectionSelectionBySubKind<
	L extends ConcreteLanguage,
	LK extends InflectableFamilyKindForLanguage<L>,
	OS extends OrthographicStatus = OrthographicStatus,
> = SelectionByOrthographicStatusForLanguage<L>[OS]["Inflection"][LK];

export type FamilyInflectionSelectionUnion<
	L extends ConcreteLanguage,
	LK extends InflectableFamilyKindForLanguage<L>,
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<FamilyInflectionSelectionBySubKind<L, LK, OS>>;
