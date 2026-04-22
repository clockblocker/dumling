import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { DePronounFeatures } from "../../../../../types/concrete-language/features/de/lexeme/pronoun";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const dePronounFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			extPos: abstractFeatureAtomSchemas.extPos.extract(["DET"]),
			foreign: abstractFeatureAtomSchemas.foreign,
			person: abstractFeatureAtomSchemas.person.extract(["1", "2", "3"]),
			polite: abstractFeatureAtomSchemas.polite.extract(["Form", "Infm"]),
			poss: abstractFeatureAtomSchemas.poss,
			pronType: abstractFeatureAtomSchemas.pronType.extract([
				"Dem",
				"Ind",
				"Int",
				"Neg",
				"Prs",
				"Rcp",
				"Rel",
				"Tot",
			]),
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				case: abstractFeatureAtomSchemas.case.extract([
					"Acc",
					"Dat",
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
	.strict() satisfies z.ZodSchema<DePronounFeatures>;

export const dePronounSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PRON",
	featuresSchema: dePronounFeaturesSchema,
});
