import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { HeAdjectiveFeatures } from "../../../../../types/concrete-language/features/he/lexeme/adjective";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heAdjectiveFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				definite: abstractFeatureAtomSchemas.definite.extract([
					"Cons",
					"Def",
				]),
				gender: z.union([
					abstractFeatureAtomSchemas.gender.extract(["Fem", "Masc"]),
					z.tuple([z.literal("Fem"), z.literal("Masc")]),
					z.tuple([z.literal("Masc"), z.literal("Fem")]),
				]),
				number: abstractFeatureAtomSchemas.number.extract([
					"Plur",
					"Sing",
				]),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<HeAdjectiveFeatures>;

export const heAdjectiveSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADJ",
	featuresSchema: heAdjectiveFeaturesSchema,
});
