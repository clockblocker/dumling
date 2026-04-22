import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnDiscourseFormulaPhrasemeFeatures } from "../../../../../types/concrete-language/features/en/phraseme/discourse-formula";

export const enDiscourseFormulaPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			discourseFormulaRole:
				abstractFeatureAtomSchemas.discourseFormulaRole,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnDiscourseFormulaPhrasemeFeatures>;
