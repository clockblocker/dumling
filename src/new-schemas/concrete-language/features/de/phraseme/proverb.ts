import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeProverbPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/proverb";

export const deProverbPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeProverbPhrasemeFeatures>;
