import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeDuplifixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/duplifix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deDuplifixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeDuplifixMorphemeFeatures>;

export const deDuplifixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: deLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Duplifix",
		featuresSchema: deDuplifixMorphemeFeaturesSchema,
	},
);
