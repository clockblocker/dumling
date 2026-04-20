import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
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

type DeNumeralBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"NUM",
		DeNumeralInherentFeatures,
		DeNumeralInflectionalFeatures,
		OS
	>;

export type DeNumeralLemma = DeNumeralBundle["Lemma"];
export type DeNumeralLemmaSurface = DeNumeralBundle["LemmaSurface"];
export type DeNumeralInflectionSurface = DeNumeralBundle["InflectionSurface"];
export type DeNumeralLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeNumeralBundle<OS>["LemmaSelection"];
export type DeNumeralInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeNumeralBundle<OS>["InflectionSelection"];

export type DeNumeralTypes = DeNumeralBundle;
