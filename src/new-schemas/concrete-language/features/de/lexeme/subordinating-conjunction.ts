import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeSubordinatingConjunctionFeatures } from "../../../../../types/concrete-language/features/de/lexeme/subordinating-conjunction";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deSubordinatingConjunctionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			conjType: abstractFeatureAtomSchemas.conjType.extract(["Comp"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeSubordinatingConjunctionFeatures>;

export const deSubordinatingConjunctionSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: deLanguageSchema,
		lemmaKind: "Lexeme",
		lemmaSubKind: "SCONJ",
		featuresSchema: deSubordinatingConjunctionFeaturesSchema,
	});
