import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { EnInfixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/infix";

export const enInfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnInfixMorphemeFeatures>;
