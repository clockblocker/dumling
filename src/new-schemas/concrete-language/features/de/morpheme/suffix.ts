import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeSuffixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/suffix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deSuffixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeSuffixMorphemeFeatures>;

export const deSuffixMorphemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Suffix",
	featuresSchema: deSuffixMorphemeFeaturesSchema,
});
