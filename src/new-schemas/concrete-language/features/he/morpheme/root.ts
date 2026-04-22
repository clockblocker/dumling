import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { HeRootMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/root";

export const heRootMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeRootMorphemeFeatures>;
