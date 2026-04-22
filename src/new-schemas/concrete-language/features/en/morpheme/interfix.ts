import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { EnInterfixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/interfix";

export const enInterfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnInterfixMorphemeFeatures>;
