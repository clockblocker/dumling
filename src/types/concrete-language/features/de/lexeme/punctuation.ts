import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type DePunctuationFeatures = {
	inherent: {
		punctType?: AbstractFeatureValue<"punctType">;
	};
	inflectional: {};
};
