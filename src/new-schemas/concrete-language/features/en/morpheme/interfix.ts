import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnInterfixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/interfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enInterfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnInterfixMorphemeFeatures>;

export const enInterfixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: enLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Interfix",
		featuresSchema: enInterfixMorphemeFeaturesSchema,
	},
);
