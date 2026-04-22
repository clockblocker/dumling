import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeDiscourseFormulaPhrasemeFeatures } from "../../../../../types/concrete-language/features/he/phraseme/discourse-formula";

export const heDiscourseFormulaPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeDiscourseFormulaPhrasemeFeatures>;
