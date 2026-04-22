import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeAdverbFeatures } from "../../../../../types/concrete-language/features/he/lexeme/adverb";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heAdverbFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			prefix: abstractFeatureAtomSchemas.prefix,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeAdverbFeatures>;

export const heAdverbSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADV",
	featuresSchema: heAdverbFeaturesSchema,
});
