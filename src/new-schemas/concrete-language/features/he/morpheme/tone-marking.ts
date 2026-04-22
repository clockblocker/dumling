import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeToneMarkingMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/tone-marking";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heToneMarkingMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeToneMarkingMorphemeFeatures>;

export const heToneMarkingMorphemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: heLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "ToneMarking",
		featuresSchema: heToneMarkingMorphemeFeaturesSchema,
	});
