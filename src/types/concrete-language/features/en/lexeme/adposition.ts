import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type EnAdpositionFeatures = {
	inherent: {
		abbr?: AbstractFeatureValue<"abbr">;
		extPos?: Extract<AbstractFeatureValue<"extPos">, "ADP" | "ADV" | "SCONJ">;
	};
	inflectional: {};
};
