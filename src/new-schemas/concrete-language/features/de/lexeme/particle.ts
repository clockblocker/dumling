import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeParticleFeatures } from "../../../../../types/concrete-language/features/de/lexeme/particle";

export const deParticleFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			foreign: abstractFeatureAtomSchemas.foreign,
			partType: abstractFeatureAtomSchemas.partType.extract(["Inf"]),
			polarity: abstractFeatureAtomSchemas.polarity.extract([
				"Neg",
				"Pos",
			]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeParticleFeatures>;
