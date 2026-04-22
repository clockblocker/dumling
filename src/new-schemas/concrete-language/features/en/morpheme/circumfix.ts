import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnCircumfixMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/circumfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enCircumfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnCircumfixMorphemeFeatures>;

export const enCircumfixMorphemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: enLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Circumfix",
		featuresSchema: enCircumfixMorphemeFeaturesSchema,
	});
