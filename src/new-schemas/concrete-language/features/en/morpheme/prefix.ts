import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnPrefixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/prefix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enPrefixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnPrefixMorphemeFeatures>;

export const enPrefixMorphemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Prefix",
	featuresSchema: enPrefixMorphemeFeaturesSchema,
});
