import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnToneMarkingMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/tone-marking";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enToneMarkingMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnToneMarkingMorphemeFeatures>;

export const enToneMarkingMorphemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: enLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "ToneMarking",
		featuresSchema: enToneMarkingMorphemeFeaturesSchema,
	});
