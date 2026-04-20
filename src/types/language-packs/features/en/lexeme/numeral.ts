import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type EnNumeralFeatures = {
	inherent: {
		abbr?: AbstractFeatureValue<"abbr">;
		extPos?: Extract<AbstractFeatureValue<"extPos">, "PROPN">;
		numForm?: Extract<AbstractFeatureValue<"numForm">, "Digit" | "Roman" | "Word">;
		numType?: Extract<AbstractFeatureValue<"numType">, "Card" | "Frac">;
	};
	inflectional: {};
};
