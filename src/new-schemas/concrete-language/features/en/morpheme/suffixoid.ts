import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnSuffixoidMorphemeFeatures } from "../../../../../types/concrete-language/features/en/morpheme/suffixoid";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enSuffixoidMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnSuffixoidMorphemeFeatures>;

export const enSuffixoidMorphemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: enLanguageSchema,
		lemmaKind: "Morpheme",
		lemmaSubKind: "Suffixoid",
		featuresSchema: enSuffixoidMorphemeFeaturesSchema,
	});
