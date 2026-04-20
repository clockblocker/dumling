import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";

export type EnPunctuationInherentFeatures = {};

export type EnPunctuationBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnUninflectableLexemeBundle<"PUNCT", EnPunctuationInherentFeatures, OS>;
