import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DePunctuationFeatures } from "../../../../../types/concrete-language/features/de/lexeme/punctuation";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const dePunctuationFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			punctType: abstractFeatureAtomSchemas.punctType,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DePunctuationFeatures>;

export const dePunctuationSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PUNCT",
	featuresSchema: dePunctuationFeaturesSchema,
});
