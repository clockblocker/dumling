import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnTransfixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/transfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enTransfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnTransfixMorphemeFeatures>;

export const enTransfixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: enLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Transfix",
		featuresSchema: enTransfixMorphemeFeaturesSchema,
	},
);
