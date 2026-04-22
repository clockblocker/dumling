import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { DeInterfixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/interfix";

export const deInterfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeInterfixMorphemeFeatures>;
