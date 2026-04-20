import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

type DeAdpositionType = Extract<
	AbstractFeatureValue<"adpType">,
	"Circ" | "Post" | "Prep"
>;
type DeAdpositionExtPos = Extract<
	AbstractFeatureValue<"extPos">,
	"ADV" | "SCONJ"
>;
type DeAdpositionPartType = Extract<AbstractFeatureValue<"partType">, "Vbp">;

export type DeAdpositionInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	adpType?: DeAdpositionType;
	extPos?: DeAdpositionExtPos;
	foreign?: AbstractFeatureValue<"foreign">;
	governedCase?: AbstractFeatureValue<"governedCase">;
	partType?: DeAdpositionPartType;
};

export type DeAdpositionBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<"ADP", DeAdpositionInherentFeatures, OS>;
