import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnIdiomPhrasemeFeatures } from "../../../../../types/concrete-language/features/en/phraseme/idiom";

export const enIdiomPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnIdiomPhrasemeFeatures>;
