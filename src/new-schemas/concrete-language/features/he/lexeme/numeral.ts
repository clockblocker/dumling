import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { HeNumeralFeatures } from "../../../../../types/concrete-language/features/he/lexeme/numeral";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heNumeralFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				definite: abstractFeatureAtomSchemas.definite.extract([
					"Cons",
					"Def",
				]),
				gender: featureValueSet(
					abstractFeatureAtomSchemas.gender.extract(["Fem", "Masc"]),
				),
				number: featureValueSet(
					abstractFeatureAtomSchemas.number.extract(["Dual", "Plur"]),
				),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<HeNumeralFeatures>;

export const heNumeralSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NUM",
	featuresSchema: heNumeralFeaturesSchema,
});
