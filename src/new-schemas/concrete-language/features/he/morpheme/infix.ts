import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeInfixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/infix";

export const heInfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeInfixMorphemeFeatures>;
