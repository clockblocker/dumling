import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type HeAdpositionFeatures = {
	inherent: {
		abbr?: AbstractFeatureValue<"abbr">;
		case?: Extract<AbstractFeatureValue<"case">, "Acc" | "Gen">;
	};
	inflectional: {};
};
