import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { HePronounFeatures } from "../../../../../types/concrete-language/features/he/lexeme/pronoun";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const hePronounFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			definite: abstractFeatureAtomSchemas.definite.extract(["Def"]),
			pronType: abstractFeatureAtomSchemas.pronType.extract([
				"Dem",
				"Ind",
				"Int",
				"Prs",
			]),
			reflex: abstractFeatureAtomSchemas.reflex,
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				gender: featureValueSet(
					abstractFeatureAtomSchemas.gender.extract(["Fem", "Masc"]),
				),
				number: abstractFeatureAtomSchemas.number.extract([
					"Plur",
					"Sing",
				]),
				person: abstractFeatureAtomSchemas.person.extract([
					"1",
					"2",
					"3",
				]),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<HePronounFeatures>;

export const hePronounSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PRON",
	featuresSchema: hePronounFeaturesSchema,
});
