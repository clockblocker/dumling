import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnIdiomPhrasemeFeatures } from "../../../../../types/concrete-language/features/en/phraseme/idiom";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enIdiomPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnIdiomPhrasemeFeatures>;

export const enIdiomPhrasemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Idiom",
	featuresSchema: enIdiomPhrasemeFeaturesSchema,
});
