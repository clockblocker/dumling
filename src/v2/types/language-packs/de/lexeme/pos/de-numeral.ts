import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type {
	DeLexemeInflectionSelection,
	DeLexemeInflectionSurface,
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";
import type { DeCase, DeGender, DeNumber } from "../shared/de-common-enums";

type DeNumeralNumType = Extract<
	AbstractFeatureValue<"numType">,
	"Card" | "Frac" | "Mult" | "Range"
>;

export type DeNumeralInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	foreign?: AbstractFeatureValue<"foreign">;
	numType?: DeNumeralNumType;
};

export type DeNumeralInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	gender?: DeGender;
	number?: DeNumber;
}>;

export type DeNumeralLemma = DeLexemeLemma<"NUM", DeNumeralInherentFeatures>;
export type DeNumeralLemmaSurface = DeLexemeLemmaSurface<
	"NUM",
	DeNumeralInherentFeatures
>;
export type DeNumeralInflectionSurface = DeLexemeInflectionSurface<
	"NUM",
	DeNumeralInherentFeatures,
	DeNumeralInflectionalFeatures
>;
export type DeNumeralLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"NUM", DeNumeralInherentFeatures, OS>;
export type DeNumeralInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"NUM",
	DeNumeralInherentFeatures,
	DeNumeralInflectionalFeatures,
	OS
>;

export type DeNumeralTypes = {
	InflectionSelection: DeNumeralInflectionSelection;
	InflectionSurface: DeNumeralInflectionSurface;
	Lemma: DeNumeralLemma;
	LemmaSelection: DeNumeralLemmaSelection;
	LemmaSurface: DeNumeralLemmaSurface;
};
