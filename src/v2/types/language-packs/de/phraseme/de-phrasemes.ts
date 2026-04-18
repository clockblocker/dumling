import type { AbstractFeatureValue } from "../../../abstract/features/features";
import type { OrthographicStatus } from "../../../core/enums";
import type { EmptyFeatures, ValueOf } from "../shared";
import type {
	DePhrasemeLemma,
	DePhrasemeLemmaSelection,
	DePhrasemeLemmaSurface,
} from "./shared/build-de-phraseme-bundle";

export type DeDiscourseFormulaInherentFeatures = {
	discourseFormulaRole?: AbstractFeatureValue<"discourseFormulaRole">;
};

export type DeAphorismLemma = DePhrasemeLemma<"Aphorism", EmptyFeatures>;
export type DeDiscourseFormulaLemma = DePhrasemeLemma<
	"DiscourseFormula",
	DeDiscourseFormulaInherentFeatures
>;
export type DeIdiomLemma = DePhrasemeLemma<"Idiom", EmptyFeatures>;
export type DeProverbLemma = DePhrasemeLemma<"Proverb", EmptyFeatures>;

export type DePhrasemeLemmaBySubKind = {
	Aphorism: DeAphorismLemma;
	DiscourseFormula: DeDiscourseFormulaLemma;
	Idiom: DeIdiomLemma;
	Proverb: DeProverbLemma;
};

export type DePhrasemeLemmaUnion = ValueOf<DePhrasemeLemmaBySubKind>;

export type DePhrasemeLemmaSurfaceBySubKind = {
	Aphorism: DePhrasemeLemmaSurface<"Aphorism", EmptyFeatures>;
	DiscourseFormula: DePhrasemeLemmaSurface<
		"DiscourseFormula",
		DeDiscourseFormulaInherentFeatures
	>;
	Idiom: DePhrasemeLemmaSurface<"Idiom", EmptyFeatures>;
	Proverb: DePhrasemeLemmaSurface<"Proverb", EmptyFeatures>;
};

export type DePhrasemeLemmaSurfaceUnion = ValueOf<DePhrasemeLemmaSurfaceBySubKind>;

export type DePhrasemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Aphorism: DePhrasemeLemmaSelection<"Aphorism", EmptyFeatures, OS>;
	DiscourseFormula: DePhrasemeLemmaSelection<
		"DiscourseFormula",
		DeDiscourseFormulaInherentFeatures,
		OS
	>;
	Idiom: DePhrasemeLemmaSelection<"Idiom", EmptyFeatures, OS>;
	Proverb: DePhrasemeLemmaSelection<"Proverb", EmptyFeatures, OS>;
};

export type DePhrasemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DePhrasemeLemmaSelectionBySubKind<OS>>;
