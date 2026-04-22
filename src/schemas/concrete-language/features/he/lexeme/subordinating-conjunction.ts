import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { HeSubordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/he/lexeme/subordinating-conjunction";

export const heSubordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			case: abstractFeatureAtomSchemas.case.extract(["Tem"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeSubordinatingConjunctionFeatures>;
