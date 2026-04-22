import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { EnDeterminerFeatures } from "../../../../../types/concrete-language/features/en/lexeme/determiner";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enDeterminerFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			definite: abstractFeatureAtomSchemas.definite.extract([
				"Def",
				"Ind",
			]),
			extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "PRON"]),
			numForm: abstractFeatureAtomSchemas.numForm.extract(["Word"]),
			numType: abstractFeatureAtomSchemas.numType.extract(["Frac"]),
			pronType: featureValueSet(
				abstractFeatureAtomSchemas.pronType.extract([
					"Art",
					"Dem",
					"Ind",
					"Int",
					"Neg",
					"Rcp",
					"Rel",
					"Tot",
				]),
			),
			style: abstractFeatureAtomSchemas.style.extract(["Vrnc"]),
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				number: abstractFeatureAtomSchemas.number.extract([
					"Plur",
					"Sing",
				]),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<EnDeterminerFeatures>;

export const enDeterminerSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "DET",
	featuresSchema: enDeterminerFeaturesSchema,
});
