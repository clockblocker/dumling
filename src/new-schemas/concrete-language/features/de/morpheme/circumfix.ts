import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeCircumfixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/circumfix";

export const deCircumfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeCircumfixMorphemeFeatures>;
