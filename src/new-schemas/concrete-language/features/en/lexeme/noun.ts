import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { EnNounFeatures } from "../../../../../types/concrete-language/features/en/lexeme/noun";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enNounFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "PROPN"]),
			foreign: abstractFeatureAtomSchemas.foreign,
			numForm: abstractFeatureAtomSchemas.numForm.extract([
				"Combi",
				"Digit",
				"Word",
			]),
			numType: abstractFeatureAtomSchemas.numType.extract([
				"Card",
				"Frac",
				"Ord",
			]),
			style: abstractFeatureAtomSchemas.style.extract(["Expr", "Vrnc"]),
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				number: abstractFeatureAtomSchemas.number.extract([
					"Plur",
					"Ptan",
					"Sing",
				]),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<EnNounFeatures>;

export const enNounSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	featuresSchema: enNounFeaturesSchema,
});
