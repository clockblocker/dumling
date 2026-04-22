import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { DeSuffixoidMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/suffixoid";

export const deSuffixoidMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeSuffixoidMorphemeFeatures>;
