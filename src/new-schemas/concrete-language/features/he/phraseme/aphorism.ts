import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeAphorismPhrasemeFeatures } from "../../../../../types/concrete-language/features/he/phraseme/aphorism";

export const heAphorismPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeAphorismPhrasemeFeatures>;
