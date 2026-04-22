import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeAphorismPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/aphorism";

export const deAphorismPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeAphorismPhrasemeFeatures>;
