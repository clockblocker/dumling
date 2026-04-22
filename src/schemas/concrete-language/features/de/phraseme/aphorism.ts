import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { DeAphorismPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/aphorism";

export const deAphorismPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeAphorismPhrasemeFeatures>;
