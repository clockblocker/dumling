import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type DeCoordinatingConjunctionFeatures = {
	inherent: {
		conjType?: Extract<AbstractFeatureValue<"conjType">, "Comp">;
	};
	inflectional: {};
};
