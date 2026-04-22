import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeCoordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/de/lexeme/coordinating-conjunction";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deCoordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			conjType: abstractFeatureAtomSchemas.conjType.extract(["Comp"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeCoordinatingConjunctionFeatures>;

export const deCoordinatingConjunctionSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: deLanguageSchema,
		lemmaKind: "Lexeme",
		lemmaSubKind: "CCONJ",
		featuresSchema: deCoordinatingConjunctionFeaturesSchema,
	});
