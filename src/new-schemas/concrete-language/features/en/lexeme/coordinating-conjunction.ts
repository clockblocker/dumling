import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnCoordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/en/lexeme/coordinating-conjunction";

export const enCoordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			polarity: abstractFeatureAtomSchemas.polarity.extract(["Neg"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnCoordinatingConjunctionFeatures>;
