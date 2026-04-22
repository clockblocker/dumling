import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeProverbPhrasemeFeatures } from "../../../../../types/concrete-language/features/he/phraseme/proverb";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heProverbPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeProverbPhrasemeFeatures>;

export const heProverbPhrasemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Proverb",
	featuresSchema: heProverbPhrasemeFeaturesSchema,
});
