import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

export type DePunctuationInherentFeatures = {
	punctType?: AbstractFeatureValue<"punctType">;
};

export type DePunctuationBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<"PUNCT", DePunctuationInherentFeatures, OS>;
