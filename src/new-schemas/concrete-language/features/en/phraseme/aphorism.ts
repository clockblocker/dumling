import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnAphorismPhrasemeFeatures } from "../../../../../types/concrete-language/features/en/phraseme/aphorism";

export const enAphorismPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnAphorismPhrasemeFeatures>;
