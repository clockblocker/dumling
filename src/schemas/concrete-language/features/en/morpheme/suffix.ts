import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { EnSuffixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/suffix";

export const enSuffixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnSuffixMorphemeFeatures>;
