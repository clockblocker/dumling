import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { HeIdiomPhrasemeFeatures } from "../../../../../types/concrete-language/features/he/phraseme/idiom";

export const heIdiomPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeIdiomPhrasemeFeatures>;
