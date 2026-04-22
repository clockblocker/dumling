import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnSuffixoidMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/suffixoid";

export const enSuffixoidMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnSuffixoidMorphemeFeatures>;
