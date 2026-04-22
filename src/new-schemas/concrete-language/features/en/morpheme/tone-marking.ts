import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnToneMarkingMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/tone-marking";

export const enToneMarkingMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnToneMarkingMorphemeFeatures>;
