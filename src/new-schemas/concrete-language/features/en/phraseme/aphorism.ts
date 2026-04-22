import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnAphorismPhrasemeFeatures } from "../../../../../types/concrete-language/features/en/phraseme/aphorism";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enAphorismPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnAphorismPhrasemeFeatures>;

export const enAphorismPhrasemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: enLanguageSchema,
		lemmaKind: "Phraseme",
		lemmaSubKind: "Aphorism",
		featuresSchema: enAphorismPhrasemeFeaturesSchema,
	},
);
