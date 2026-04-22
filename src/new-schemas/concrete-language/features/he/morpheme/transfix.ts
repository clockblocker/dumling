import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeTransfixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/transfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heTransfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeTransfixMorphemeFeatures>;

export const heTransfixMorphemeSchemas = buildUninflectableConcreteSchemaBundle(
	{
		languageSchema: heLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Transfix",
		featuresSchema: heTransfixMorphemeFeaturesSchema,
	},
);
