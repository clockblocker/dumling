import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import type { HeDeterminerFeatures } from "../../../../../types/concrete-language/features/he/lexeme/determiner";

export const heDeterminerFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			pronType: abstractFeatureAtomSchemas.pronType.extract([
				"Art",
				"Int",
			]),
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				definite: abstractFeatureAtomSchemas.definite.extract([
					"Cons",
					"Def",
				]),
				gender: featureValueSet(
					abstractFeatureAtomSchemas.gender.extract(["Fem", "Masc"]),
				),
				number: abstractFeatureAtomSchemas.number.extract([
					"Plur",
					"Sing",
				]),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<HeDeterminerFeatures>;
