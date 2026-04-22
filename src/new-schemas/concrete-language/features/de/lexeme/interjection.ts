import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeInterjectionFeatures } from "../../../../../types/concrete-language/features/de/lexeme/interjection";

export const deInterjectionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			partType: abstractFeatureAtomSchemas.partType.extract(["Res"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeInterjectionFeatures>;
