import { z } from "zod/v3";
import type { EnGeneralFusionFeatures } from "../../../../../types/concrete-language/features/en/fusion/general";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";

export const enGeneralFusionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnGeneralFusionFeatures>;
