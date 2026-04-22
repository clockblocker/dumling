import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { DePrefixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/prefix";

export const dePrefixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			hasSepPrefix: abstractFeatureAtomSchemas.hasSepPrefix,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DePrefixMorphemeFeatures>;
