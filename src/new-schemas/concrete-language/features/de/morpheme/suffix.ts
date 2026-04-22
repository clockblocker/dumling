import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { DeSuffixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/suffix";

export const deSuffixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeSuffixMorphemeFeatures>;
