import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeInfixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/infix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deInfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeInfixMorphemeFeatures>;

export const deInfixMorphemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Infix",
	featuresSchema: deInfixMorphemeFeaturesSchema,
});
