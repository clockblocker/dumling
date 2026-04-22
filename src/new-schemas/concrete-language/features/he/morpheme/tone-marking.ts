import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeToneMarkingMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/tone-marking";

export const heToneMarkingMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeToneMarkingMorphemeFeatures>;
