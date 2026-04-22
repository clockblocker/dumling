import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { EnSubordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/en/lexeme/subordinating-conjunction";

export const enSubordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			extPos: abstractFeatureAtomSchemas.extPos.extract(["ADP", "SCONJ"]),
			style: abstractFeatureAtomSchemas.style.extract(["Vrnc"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnSubordinatingConjunctionFeatures>;
