import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type EnCoordinatingConjunctionFeatures = {
	inherent: {
		abbr?: AbstractFeatureValue<"abbr">;
		polarity?: Extract<AbstractFeatureValue<"polarity">, "Neg">;
	};
	inflectional: {};
};
