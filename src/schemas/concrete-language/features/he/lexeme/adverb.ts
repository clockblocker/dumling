import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { HeAdverbFeatures } from "../../../../../types/concrete-language/features/he/lexeme/adverb";

export const heAdverbFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			prefix: abstractFeatureAtomSchemas.prefix,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeAdverbFeatures>;
