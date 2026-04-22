import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { EnPronounFeatures } from "../../../../../types/concrete-language/features/en/lexeme/pronoun";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enPronounFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "PRON"]),
			person: abstractFeatureAtomSchemas.person.extract(["1", "2", "3"]),
			poss: abstractFeatureAtomSchemas.poss,
			pronType: featureValueSet(
				abstractFeatureAtomSchemas.pronType.extract([
					"Dem",
					"Emp",
					"Ind",
					"Int",
					"Neg",
					"Prs",
					"Rcp",
					"Rel",
					"Tot",
				]),
			),
			style: abstractFeatureAtomSchemas.style.extract([
				"Arch",
				"Coll",
				"Expr",
				"Slng",
				"Vrnc",
			]),
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				case: abstractFeatureAtomSchemas.case.extract([
					"Acc",
					"Gen",
					"Nom",
				]),
				gender: abstractFeatureAtomSchemas.gender.extract([
					"Fem",
					"Masc",
					"Neut",
				]),
				number: abstractFeatureAtomSchemas.number.extract([
					"Plur",
					"Sing",
				]),
				reflex: abstractFeatureAtomSchemas.reflex,
			}),
		),
	})
	.strict() satisfies z.ZodSchema<EnPronounFeatures>;

export const enPronounSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PRON",
	featuresSchema: enPronounFeaturesSchema,
});
