import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnProverbPhrasemeFeatures } from "../../../../../types/concrete-language/features/en/phraseme/proverb";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enProverbPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnProverbPhrasemeFeatures>;

export const enProverbPhrasemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Proverb",
	featuresSchema: enProverbPhrasemeFeaturesSchema,
});
