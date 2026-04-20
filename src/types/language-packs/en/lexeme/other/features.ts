import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type EnOtherFeatures = {
	inherent: {
		extPos?: Extract<AbstractFeatureValue<"extPos">, "PROPN">;
		foreign?: AbstractFeatureValue<"foreign">;
	};
	inflectional: {};
};
