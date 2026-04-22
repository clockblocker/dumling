import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { HeAuxiliaryFeatures } from "../../../../../types/concrete-language/features/he/lexeme/auxiliary";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heAuxiliaryFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			verbType: abstractFeatureAtomSchemas.verbType.extract([
				"Cop",
				"Mod",
			]),
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
				person: featureValueSet(
					abstractFeatureAtomSchemas.person.extract(["1", "2", "3"]),
				),
				polarity: abstractFeatureAtomSchemas.polarity.extract([
					"Neg",
					"Pos",
				]),
				tense: abstractFeatureAtomSchemas.tense.extract([
					"Fut",
					"Past",
				]),
				verbForm: abstractFeatureAtomSchemas.verbForm.extract([
					"Inf",
					"Part",
				]),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<HeAuxiliaryFeatures>;

export const heAuxiliarySchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "AUX",
	featuresSchema: heAuxiliaryFeaturesSchema,
});
