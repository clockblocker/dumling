import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeDuplifixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/duplifix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heDuplifixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeDuplifixMorphemeFeatures>;

export const heDuplifixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: heLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Duplifix",
		featuresSchema: heDuplifixMorphemeFeaturesSchema,
	},
);
