import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeToneMarkingMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/tone-marking";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deToneMarkingMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeToneMarkingMorphemeFeatures>;

export const deToneMarkingMorphemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: deLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "ToneMarking",
		featuresSchema: deToneMarkingMorphemeFeaturesSchema,
	});
