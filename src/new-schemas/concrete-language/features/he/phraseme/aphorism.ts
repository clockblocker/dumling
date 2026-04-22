import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeAphorismPhrasemeFeatures } from "../../../../../types/concrete-language/features/he/phraseme/aphorism";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heAphorismPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeAphorismPhrasemeFeatures>;

export const heAphorismPhrasemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: heLanguageSchema,
		lemmaKind: "Phraseme",
		lemmaSubKind: "Aphorism",
		featuresSchema: heAphorismPhrasemeFeaturesSchema,
	},
);
