import type { OrthographicStatus } from "../../../core/enums";
import type { EmptyFeatures, ValueOf } from "../shared";
import type {
	HePhrasemeLemma,
	HePhrasemeLemmaSelection,
	HePhrasemeLemmaSurface,
} from "./shared/build-he-phraseme-bundle";

export type HeAphorismLemma = HePhrasemeLemma<"Aphorism", EmptyFeatures>;
export type HeDiscourseFormulaLemma = HePhrasemeLemma<
	"DiscourseFormula",
	EmptyFeatures
>;
export type HeIdiomLemma = HePhrasemeLemma<"Idiom", EmptyFeatures>;
export type HeProverbLemma = HePhrasemeLemma<"Proverb", EmptyFeatures>;

export type HePhrasemeLemmaBySubKind = {
	Aphorism: HeAphorismLemma;
	DiscourseFormula: HeDiscourseFormulaLemma;
	Idiom: HeIdiomLemma;
	Proverb: HeProverbLemma;
};

export type HePhrasemeLemmaUnion = ValueOf<HePhrasemeLemmaBySubKind>;

export type HePhrasemeLemmaSurfaceBySubKind = {
	Aphorism: HePhrasemeLemmaSurface<"Aphorism", EmptyFeatures>;
	DiscourseFormula: HePhrasemeLemmaSurface<
		"DiscourseFormula",
		EmptyFeatures
	>;
	Idiom: HePhrasemeLemmaSurface<"Idiom", EmptyFeatures>;
	Proverb: HePhrasemeLemmaSurface<"Proverb", EmptyFeatures>;
};

export type HePhrasemeLemmaSurfaceUnion =
	ValueOf<HePhrasemeLemmaSurfaceBySubKind>;

export type HePhrasemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Aphorism: HePhrasemeLemmaSelection<"Aphorism", EmptyFeatures, OS>;
	DiscourseFormula: HePhrasemeLemmaSelection<
		"DiscourseFormula",
		EmptyFeatures,
		OS
	>;
	Idiom: HePhrasemeLemmaSelection<"Idiom", EmptyFeatures, OS>;
	Proverb: HePhrasemeLemmaSelection<"Proverb", EmptyFeatures, OS>;
};

export type HePhrasemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<HePhrasemeLemmaSelectionBySubKind<OS>>;
