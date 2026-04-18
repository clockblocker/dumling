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

export type DeProperNounInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	foreign?: AbstractFeatureValue<"foreign">;
	gender?: DeGender;
};

export type DeProperNounInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	number?: DeNumber;
}>;

export type DeProperNounLemma = DeLexemeLemma<
	"PROPN",
	DeProperNounInherentFeatures
>;
export type DeProperNounLemmaSurface = DeLexemeLemmaSurface<
	"PROPN",
	DeProperNounInherentFeatures
>;
export type DeProperNounInflectionSurface = DeLexemeInflectionSurface<
	"PROPN",
	DeProperNounInherentFeatures,
	DeProperNounInflectionalFeatures
>;
export type DeProperNounLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"PROPN", DeProperNounInherentFeatures, OS>;
export type DeProperNounInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"PROPN",
	DeProperNounInherentFeatures,
	DeProperNounInflectionalFeatures,
	OS
>;

export type DeProperNounTypes = {
	InflectionSelection: DeProperNounInflectionSelection;
	InflectionSurface: DeProperNounInflectionSurface;
	Lemma: DeProperNounLemma;
	LemmaSelection: DeProperNounLemmaSelection;
	LemmaSurface: DeProperNounLemmaSurface;
};
