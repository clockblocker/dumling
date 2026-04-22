import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeInterfixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/interfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deInterfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeInterfixMorphemeFeatures>;

export const deInterfixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: deLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Interfix",
		featuresSchema: deInterfixMorphemeFeaturesSchema,
	},
);
