import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type DeInterjectionFeatures = {
	inherent: {
		partType?: Extract<AbstractFeatureValue<"partType">, "Res">;
	};
	inflectional: {};
};
