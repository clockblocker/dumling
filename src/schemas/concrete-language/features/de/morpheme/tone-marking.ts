import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { DeToneMarkingMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/tone-marking";

export const deToneMarkingMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeToneMarkingMorphemeFeatures>;
