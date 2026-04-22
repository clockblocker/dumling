import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { HeAdjectiveFeatures } from "../../../../../types/concrete-language/features/he/lexeme/adjective";

export const heAdjectiveFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
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
	.strict() satisfies z.ZodSchema<HeAdjectiveFeatures>;
