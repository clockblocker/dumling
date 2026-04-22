import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeCircumfixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/circumfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deCircumfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeCircumfixMorphemeFeatures>;

export const deCircumfixMorphemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: deLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Circumfix",
		featuresSchema: deCircumfixMorphemeFeaturesSchema,
	});
