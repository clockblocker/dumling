import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeDiscourseFormulaPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/discourse-formula";

export const deDiscourseFormulaPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			discourseFormulaRole:
				abstractFeatureAtomSchemas.discourseFormulaRole,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeDiscourseFormulaPhrasemeFeatures>;
