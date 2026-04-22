import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DePrefixMorphemeFeatures } from "../../../../../types/concrete-language/features/de/morpheme/prefix";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const dePrefixMorphemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			hasSepPrefix: abstractFeatureAtomSchemas.hasSepPrefix,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DePrefixMorphemeFeatures>;

export const dePrefixMorphemeSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Prefix",
	featuresSchema: dePrefixMorphemeFeaturesSchema,
});
