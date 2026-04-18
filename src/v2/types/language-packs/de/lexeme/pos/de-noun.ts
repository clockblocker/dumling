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

export type DeNounInherentFeatures = {
	gender?: DeGender;
	hyph?: AbstractFeatureValue<"hyph">;
};

export type DeNounInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	number?: DeNumber;
}>;

export type DeNounLemma = DeLexemeLemma<"NOUN", DeNounInherentFeatures>;
export type DeNounLemmaSurface = DeLexemeLemmaSurface<
	"NOUN",
	DeNounInherentFeatures
>;
export type DeNounInflectionSurface = DeLexemeInflectionSurface<
	"NOUN",
	DeNounInherentFeatures,
	DeNounInflectionalFeatures
>;
export type DeNounLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"NOUN", DeNounInherentFeatures, OS>;
export type DeNounInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"NOUN",
	DeNounInherentFeatures,
	DeNounInflectionalFeatures,
	OS
>;

export type DeNounTypes = {
	InflectionSelection: DeNounInflectionSelection;
	InflectionSurface: DeNounInflectionSurface;
	Lemma: DeNounLemma;
	LemmaSelection: DeNounLemmaSelection;
	LemmaSurface: DeNounLemmaSurface;
};
