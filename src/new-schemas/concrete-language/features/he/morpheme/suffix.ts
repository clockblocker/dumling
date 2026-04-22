import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeSuffixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/suffix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heSuffixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeSuffixMorphemeFeatures>;

export const heSuffixMorphemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Suffix",
	featuresSchema: heSuffixMorphemeFeaturesSchema,
});
