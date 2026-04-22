import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { EnAdjectiveFeatures } from "../../../../../types/concrete-language/features/en/lexeme/adjective";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enAdjectiveFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			extPos: abstractFeatureAtomSchemas.extPos.extract([
				"ADP",
				"ADV",
				"SCONJ",
			]),
			numForm: abstractFeatureAtomSchemas.numForm.extract([
				"Combi",
				"Word",
			]),
			numType: abstractFeatureAtomSchemas.numType.extract([
				"Frac",
				"Ord",
			]),
			style: abstractFeatureAtomSchemas.style.extract(["Expr"]),
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				degree: abstractFeatureAtomSchemas.degree.extract([
					"Cmp",
					"Pos",
					"Sup",
				]),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<EnAdjectiveFeatures>;

export const enAdjectiveSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADJ",
	featuresSchema: enAdjectiveFeaturesSchema,
});
