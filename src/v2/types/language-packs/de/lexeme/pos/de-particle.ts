import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type {
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";
import type { DePolarity } from "../shared/de-common-enums";

type DeParticlePartType = Extract<AbstractFeatureValue<"partType">, "Inf">;

export type DeParticleInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	foreign?: AbstractFeatureValue<"foreign">;
	partType?: DeParticlePartType;
	polarity?: DePolarity;
};

export type DeParticleLemma = DeLexemeLemma<"PART", DeParticleInherentFeatures>;
export type DeParticleLemmaSurface = DeLexemeLemmaSurface<
	"PART",
	DeParticleInherentFeatures
>;
export type DeParticleLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"PART", DeParticleInherentFeatures, OS>;

export type DeParticleTypes = {
	Lemma: DeParticleLemma;
	LemmaSelection: DeParticleLemmaSelection;
	LemmaSurface: DeParticleLemmaSurface;
};
