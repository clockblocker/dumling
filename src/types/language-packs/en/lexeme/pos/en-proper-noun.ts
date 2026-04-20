import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type { EnNumber, EnStyle } from "../shared/en-common-enums";

type EnProperNounExtPos = Extract<AbstractFeatureValue<"extPos">, "PROPN">;
type EnProperNounStyle = Extract<EnStyle, "Expr">;

export type EnProperNounInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnProperNounExtPos;
	style?: EnProperNounStyle;
};

export type EnProperNounInflectionalFeatures = RequireAtLeastOne<{
	number?: EnNumber;
}>;

export type EnProperNounBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnInflectableLexemeBundle<
	"PROPN",
	EnProperNounInherentFeatures,
	EnProperNounInflectionalFeatures,
	OS
>;
