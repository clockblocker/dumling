import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeAphorismPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/aphorism";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deAphorismPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeAphorismPhrasemeFeatures>;

export const deAphorismPhrasemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: deLanguageSchema,
		lemmaKind: "Phraseme",
		lemmaSubKind: "Aphorism",
		featuresSchema: deAphorismPhrasemeFeaturesSchema,
	},
);
