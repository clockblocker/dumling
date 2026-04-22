import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { HeSuffixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/suffix";

export const heSuffixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeSuffixMorphemeFeatures>;
