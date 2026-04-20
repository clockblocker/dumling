import type { AbstractFeatureValue } from "../../../abstract/features/features";
import type { OrthographicStatus } from "../../../core/enums";
import type { EmptyFeatures, ValueOf } from "../shared";
import type {
	EnPhrasemeLemma,
	EnPhrasemeLemmaSelection,
	EnPhrasemeLemmaSurface,
} from "./shared/build-en-phraseme-bundle";

export type EnDiscourseFormulaInherentFeatures = {
	discourseFormulaRole?: AbstractFeatureValue<"discourseFormulaRole">;
};

export type EnAphorismLemma = EnPhrasemeLemma<"Aphorism", EmptyFeatures>;
export type EnDiscourseFormulaLemma = EnPhrasemeLemma<
	"DiscourseFormula",
	EnDiscourseFormulaInherentFeatures
>;
export type EnIdiomLemma = EnPhrasemeLemma<"Idiom", EmptyFeatures>;
export type EnProverbLemma = EnPhrasemeLemma<"Proverb", EmptyFeatures>;

export type EnPhrasemeLemmaBySubKind = {
	Aphorism: EnAphorismLemma;
	DiscourseFormula: EnDiscourseFormulaLemma;
	Idiom: EnIdiomLemma;
	Proverb: EnProverbLemma;
};

export type EnPhrasemeLemmaUnion = ValueOf<EnPhrasemeLemmaBySubKind>;

export type EnPhrasemeLemmaSurfaceBySubKind = {
	Aphorism: EnPhrasemeLemmaSurface<"Aphorism", EmptyFeatures>;
	DiscourseFormula: EnPhrasemeLemmaSurface<
		"DiscourseFormula",
		EnDiscourseFormulaInherentFeatures
	>;
	Idiom: EnPhrasemeLemmaSurface<"Idiom", EmptyFeatures>;
	Proverb: EnPhrasemeLemmaSurface<"Proverb", EmptyFeatures>;
};

export type EnPhrasemeLemmaSurfaceUnion = ValueOf<EnPhrasemeLemmaSurfaceBySubKind>;

export type EnPhrasemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Aphorism: EnPhrasemeLemmaSelection<"Aphorism", EmptyFeatures, OS>;
	DiscourseFormula: EnPhrasemeLemmaSelection<
		"DiscourseFormula",
		EnDiscourseFormulaInherentFeatures,
		OS
	>;
	Idiom: EnPhrasemeLemmaSelection<"Idiom", EmptyFeatures, OS>;
	Proverb: EnPhrasemeLemmaSelection<"Proverb", EmptyFeatures, OS>;
};

export type EnPhrasemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnPhrasemeLemmaSelectionBySubKind<OS>>;
