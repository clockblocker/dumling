import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type { EnPolarity } from "../shared/en-common-enums";

type EnParticleExtPos = Extract<AbstractFeatureValue<"extPos">, "CCONJ">;
type EnParticlePolarity = Extract<EnPolarity, "Neg">;

export type EnParticleInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnParticleExtPos;
	polarity?: EnParticlePolarity;
};

export type EnParticleBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnUninflectableLexemeBundle<"PART", EnParticleInherentFeatures, OS>;
