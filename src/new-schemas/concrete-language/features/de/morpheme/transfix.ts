import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeTransfixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/transfix";

export const deTransfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeTransfixMorphemeFeatures>;
