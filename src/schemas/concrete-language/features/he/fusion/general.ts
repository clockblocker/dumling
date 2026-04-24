import { z } from "zod/v3";
import type { HeGeneralFusionFeatures } from "../../../../../types/concrete-language/features/he/fusion/general";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";

export const heGeneralFusionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeGeneralFusionFeatures>;
