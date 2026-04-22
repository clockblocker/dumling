import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { HeProverbPhrasemeFeatures } from "../../../../../types/concrete-language/features/he/phraseme/proverb";

export const heProverbPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeProverbPhrasemeFeatures>;
