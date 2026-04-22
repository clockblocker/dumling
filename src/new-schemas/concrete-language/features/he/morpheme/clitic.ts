import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeCliticMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/clitic";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heCliticMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeCliticMorphemeFeatures>;

export const heCliticMorphemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Clitic",
	featuresSchema: heCliticMorphemeFeaturesSchema,
});
