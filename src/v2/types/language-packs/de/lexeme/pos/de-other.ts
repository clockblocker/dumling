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
import type {
	DeCase,
	DeGender,
	DeMood,
	DeNumber,
	DeVerbForm,
} from "../shared/de-common-enums";

type DeOtherNumType = Extract<
	AbstractFeatureValue<"numType">,
	"Card" | "Mult" | "Range"
>;

export type DeOtherInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	foreign?: AbstractFeatureValue<"foreign">;
	hyph?: AbstractFeatureValue<"hyph">;
	numType?: DeOtherNumType;
};

export type DeOtherInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	gender?: DeGender;
	mood?: DeMood;
	number?: DeNumber;
	verbForm?: DeVerbForm;
}>;

export type DeOtherLemma = DeLexemeLemma<"X", DeOtherInherentFeatures>;
export type DeOtherLemmaSurface = DeLexemeLemmaSurface<
	"X",
	DeOtherInherentFeatures
>;
export type DeOtherInflectionSurface = DeLexemeInflectionSurface<
	"X",
	DeOtherInherentFeatures,
	DeOtherInflectionalFeatures
>;
export type DeOtherLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"X", DeOtherInherentFeatures, OS>;
export type DeOtherInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"X",
	DeOtherInherentFeatures,
	DeOtherInflectionalFeatures,
	OS
>;

export type DeOtherTypes = {
	InflectionSelection: DeOtherInflectionSelection;
	InflectionSurface: DeOtherInflectionSurface;
	Lemma: DeOtherLemma;
	LemmaSelection: DeOtherLemmaSelection;
	LemmaSurface: DeOtherLemmaSurface;
};
