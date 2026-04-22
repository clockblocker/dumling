import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeCoordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/he/lexeme/coordinating-conjunction";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heCoordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeCoordinatingConjunctionFeatures>;

export const heCoordinatingConjunctionSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: heLanguageSchema,
		lemmaKind: "Lexeme",
		lemmaSubKind: "CCONJ",
		featuresSchema: heCoordinatingConjunctionFeaturesSchema,
	});
