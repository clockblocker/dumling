import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
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

type DeOtherBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"X",
		DeOtherInherentFeatures,
		DeOtherInflectionalFeatures,
		OS
	>;

export type DeOtherLemma = DeOtherBundle["Lemma"];
export type DeOtherLemmaSurface = DeOtherBundle["LemmaSurface"];
export type DeOtherInflectionSurface = DeOtherBundle["InflectionSurface"];
export type DeOtherLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeOtherBundle<OS>["LemmaSelection"];
export type DeOtherInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeOtherBundle<OS>["InflectionSelection"];

export type DeOtherTypes = DeOtherBundle;
