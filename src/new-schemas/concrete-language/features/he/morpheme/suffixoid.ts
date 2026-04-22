import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { HeSuffixoidMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/suffixoid";

export const heSuffixoidMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeSuffixoidMorphemeFeatures>;
