import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnCliticMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/clitic";

export const enCliticMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnCliticMorphemeFeatures>;
