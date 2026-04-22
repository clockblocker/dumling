import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { EnProverbPhrasemeFeatures } from "../../../../../types/concrete-language/features/en/phraseme/proverb";

export const enProverbPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnProverbPhrasemeFeatures>;
