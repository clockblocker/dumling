import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type DeSubordinatingConjunctionFeatures = {
	inherent: {
		conjType?: Extract<AbstractFeatureValue<"conjType">, "Comp">;
	};
	inflectional: {};
};
