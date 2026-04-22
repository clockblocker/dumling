import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { DeAdverbFeatures } from "../../../../../types/concrete-language/features/de/lexeme/adverb";
import { buildInflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deAdverbFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			foreign: abstractFeatureAtomSchemas.foreign,
			numType: abstractFeatureAtomSchemas.numType.extract([
				"Card",
				"Mult",
			]),
			pronType: abstractFeatureAtomSchemas.pronType.extract([
				"Dem",
				"Ind",
				"Int",
				"Neg",
				"Rel",
			]),
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
	.strict() satisfies z.ZodSchema<DeAdverbFeatures>;

export const deAdverbSchemas = buildInflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADV",
	featuresSchema: deAdverbFeaturesSchema,
});
