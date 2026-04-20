import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DePolarity } from "../shared/de-common-enums";

type DeParticlePartType = Extract<AbstractFeatureValue<"partType">, "Inf">;

export type DeParticleInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	foreign?: AbstractFeatureValue<"foreign">;
	partType?: DeParticlePartType;
	polarity?: DePolarity;
};

export type DeParticleBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<"PART", DeParticleInherentFeatures, OS>;
