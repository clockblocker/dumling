import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { HeCoordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/he/lexeme/coordinating-conjunction";

export const heCoordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeCoordinatingConjunctionFeatures>;
