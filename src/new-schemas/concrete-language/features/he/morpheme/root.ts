import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeRootMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/root";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heRootMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeRootMorphemeFeatures>;

export const heRootMorphemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Root",
	featuresSchema: heRootMorphemeFeaturesSchema,
});
