import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { DeDuplifixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/duplifix";

export const deDuplifixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeDuplifixMorphemeFeatures>;
