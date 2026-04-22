import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnCliticMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/clitic";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enCliticMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnCliticMorphemeFeatures>;

export const enCliticMorphemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Clitic",
	featuresSchema: enCliticMorphemeFeaturesSchema,
});
