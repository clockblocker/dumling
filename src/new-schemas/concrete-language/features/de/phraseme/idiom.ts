import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { DeIdiomPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/idiom";

export const deIdiomPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeIdiomPhrasemeFeatures>;
