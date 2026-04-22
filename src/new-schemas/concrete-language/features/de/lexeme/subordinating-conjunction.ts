import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeSubordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/de/lexeme/subordinating-conjunction";

export const deSubordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			conjType: abstractFeatureAtomSchemas.conjType.extract(["Comp"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeSubordinatingConjunctionFeatures>;
