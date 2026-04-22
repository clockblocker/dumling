import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeIdiomPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/idiom";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deIdiomPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeIdiomPhrasemeFeatures>;

export const deIdiomPhrasemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Idiom",
	featuresSchema: deIdiomPhrasemeFeaturesSchema,
});
