import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { EnNumeralFeatures } from "../../../../../types/concrete-language/features/en/lexeme/numeral";

export const enNumeralFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			extPos: abstractFeatureAtomSchemas.extPos.extract(["PROPN"]),
			numForm: abstractFeatureAtomSchemas.numForm.extract([
				"Digit",
				"Roman",
				"Word",
			]),
			numType: abstractFeatureAtomSchemas.numType.extract([
				"Card",
				"Frac",
			]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnNumeralFeatures>;
