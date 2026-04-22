import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeCircumfixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/circumfix";

export const heCircumfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeCircumfixMorphemeFeatures>;
