import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
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

export type DeProperNounBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeInflectableLexemeBundle<
	"PROPN",
	DeProperNounInherentFeatures,
	DeProperNounInflectionalFeatures,
	OS
>;
