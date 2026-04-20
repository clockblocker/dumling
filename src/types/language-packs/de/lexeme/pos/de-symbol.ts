import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DeCase, DeGender, DeNumber } from "../shared/de-common-enums";

type DeSymbolNumType = Extract<
	AbstractFeatureValue<"numType">,
	"Card" | "Range"
>;

export type DeSymbolInherentFeatures = {
	foreign?: AbstractFeatureValue<"foreign">;
	numType?: DeSymbolNumType;
};

export type DeSymbolInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	gender?: DeGender;
	number?: DeNumber;
}>;

export type DeSymbolBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"SYM",
		DeSymbolInherentFeatures,
		DeSymbolInflectionalFeatures,
		OS
	>;
