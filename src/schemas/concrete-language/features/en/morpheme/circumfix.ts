import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { EnCircumfixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/circumfix";

export const enCircumfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnCircumfixMorphemeFeatures>;
