import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import type { EnOtherFeatures } from "../../../../../types/concrete-language/features/en/lexeme/other";

export const enOtherFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			extPos: abstractFeatureAtomSchemas.extPos.extract(["PROPN"]),
			foreign: abstractFeatureAtomSchemas.foreign,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnOtherFeatures>;
