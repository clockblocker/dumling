import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeSubordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/he/lexeme/subordinating-conjunction";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heSubordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			case: abstractFeatureAtomSchemas.case.extract(["Tem"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeSubordinatingConjunctionFeatures>;

export const heSubordinatingConjunctionSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: heLanguageSchema,
		lemmaKind: "Lexeme",
		lemmaSubKind: "SCONJ",
		featuresSchema: heSubordinatingConjunctionFeaturesSchema,
	});
