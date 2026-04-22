import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeProverbPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/proverb";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deProverbPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeProverbPhrasemeFeatures>;

export const deProverbPhrasemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Proverb",
	featuresSchema: deProverbPhrasemeFeaturesSchema,
});
