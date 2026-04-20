import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type {
	DeCase,
	DeDegree,
	DeGender,
	DeNumber,
} from "../shared/de-common-enums";

type DeAdjectiveNumType = Extract<
	AbstractFeatureValue<"numType">,
	"Card" | "Ord"
>;

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

export type DeAdjectiveBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeInflectableLexemeBundle<
	"ADJ",
	DeAdjectiveInherentFeatures,
	DeAdjectiveInflectionalFeatures,
	OS
>;
