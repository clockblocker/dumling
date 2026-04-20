import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type EnSubordinatingConjunctionFeatures = {
	inherent: {
		abbr?: AbstractFeatureValue<"abbr">;
		extPos?: Extract<AbstractFeatureValue<"extPos">, "ADP" | "SCONJ">;
		style?: Extract<AbstractFeatureValue<"style">, "Vrnc">;
	};
	inflectional: {};
};
