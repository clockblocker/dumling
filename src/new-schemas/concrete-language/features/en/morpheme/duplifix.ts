import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnDuplifixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/duplifix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enDuplifixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnDuplifixMorphemeFeatures>;

export const enDuplifixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: enLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Duplifix",
		featuresSchema: enDuplifixMorphemeFeaturesSchema,
	},
);
