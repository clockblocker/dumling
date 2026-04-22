import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeTransfixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/transfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deTransfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeTransfixMorphemeFeatures>;

export const deTransfixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: deLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Transfix",
		featuresSchema: deTransfixMorphemeFeaturesSchema,
	},
);
