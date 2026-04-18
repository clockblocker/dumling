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
	DeDegree,
	DeGender,
	DeNumber,
} from "../shared/de-common-enums";

type DeAdjectiveNumType = Extract<AbstractFeatureValue<"numType">, "Card" | "Ord">;

export type DeAdjectiveInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	foreign?: AbstractFeatureValue<"foreign">;
	numType?: DeAdjectiveNumType;
	variant?: AbstractFeatureValue<"variant">;
};

export type DeAdjectiveInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	degree?: DeDegree;
	gender?: DeGender;
	number?: DeNumber;
}>;

export type DeAdjectiveLemma = DeLexemeLemma<
	"ADJ",
	DeAdjectiveInherentFeatures
>;
export type DeAdjectiveLemmaSurface = DeLexemeLemmaSurface<
	"ADJ",
	DeAdjectiveInherentFeatures
>;
export type DeAdjectiveInflectionSurface = DeLexemeInflectionSurface<
	"ADJ",
	DeAdjectiveInherentFeatures,
	DeAdjectiveInflectionalFeatures
>;
export type DeAdjectiveLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"ADJ", DeAdjectiveInherentFeatures, OS>;
export type DeAdjectiveInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"ADJ",
	DeAdjectiveInherentFeatures,
	DeAdjectiveInflectionalFeatures,
	OS
>;

export type DeAdjectiveTypes = {
	InflectionSelection: DeAdjectiveInflectionSelection;
	InflectionSurface: DeAdjectiveInflectionSurface;
	Lemma: DeAdjectiveLemma;
	LemmaSelection: DeAdjectiveLemmaSelection;
	LemmaSurface: DeAdjectiveLemmaSurface;
};
