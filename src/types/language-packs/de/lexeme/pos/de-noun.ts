import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DeCase, DeGender, DeNumber } from "../shared/de-common-enums";

export type DeNounInherentFeatures = {
	gender?: DeGender;
	hyph?: AbstractFeatureValue<"hyph">;
};

export type DeNounInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	number?: DeNumber;
}>;

export type DeNounBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"NOUN",
		DeNounInherentFeatures,
		DeNounInflectionalFeatures,
		OS
	>;
