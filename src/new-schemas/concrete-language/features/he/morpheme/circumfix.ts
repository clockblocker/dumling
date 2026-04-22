import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeCircumfixMorphemeFeatures } from "../../../../../types/concrete-language/features/he/morpheme/circumfix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heCircumfixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeCircumfixMorphemeFeatures>;

export const heCircumfixMorphemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: heLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Circumfix",
		featuresSchema: heCircumfixMorphemeFeaturesSchema,
	});
