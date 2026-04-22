import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import type { DeAdjectiveFeatures } from "../../../../../types/concrete-language/features/de/lexeme/adjective";

export const deAdjectiveFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			foreign: abstractFeatureAtomSchemas.foreign,
			numType: abstractFeatureAtomSchemas.numType.extract([
				"Card",
				"Ord",
			]),
			variant: abstractFeatureAtomSchemas.variant,
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				case: abstractFeatureAtomSchemas.case.extract([
					"Acc",
					"Dat",
					"Gen",
					"Nom",
				]),
				degree: abstractFeatureAtomSchemas.degree.extract([
					"Cmp",
					"Pos",
					"Sup",
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
			}),
		),
	})
	.strict() satisfies z.ZodSchema<DeAdjectiveFeatures>;
