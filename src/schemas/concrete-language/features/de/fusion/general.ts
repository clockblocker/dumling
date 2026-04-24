import { z } from "zod/v3";
import type { DeGeneralFusionFeatures } from "../../../../../types/concrete-language/features/de/fusion/general";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";

export const deGeneralFusionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeGeneralFusionFeatures>;
