import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeDuplifixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/duplifix";

export const heDuplifixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeDuplifixMorphemeFeatures>;
