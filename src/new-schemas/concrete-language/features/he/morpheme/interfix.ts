import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeInterfixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/interfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heInterfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeInterfixMorphemeFeatures>;

export const heInterfixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: heLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Interfix",
		featuresSchema: heInterfixMorphemeFeaturesSchema,
	},
);
