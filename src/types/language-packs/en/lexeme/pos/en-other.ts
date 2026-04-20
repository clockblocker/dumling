import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";

type EnOtherExtPos = Extract<AbstractFeatureValue<"extPos">, "PROPN">;

export type EnOtherInherentFeatures = {
	extPos?: EnOtherExtPos;
	foreign?: AbstractFeatureValue<"foreign">;
};

export type EnOtherBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnUninflectableLexemeBundle<"X", EnOtherInherentFeatures, OS>;
