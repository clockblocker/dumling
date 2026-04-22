import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../../schemas/shared/feature-helpers";
import type { DeNounFeatures } from "../../../../../types/concrete-language/features/de/lexeme/noun";

export const deNounFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			gender: abstractFeatureAtomSchemas.gender.extract([
				"Fem",
				"Masc",
				"Neut",
			]),
			hyph: abstractFeatureAtomSchemas.hyph,
		}),
		inflectional: requireNonEmptyFeatureObject(
			buildOptionalFeatureObjectSchema({
				case: abstractFeatureAtomSchemas.case.extract([
					"Acc",
					"Dat",
					"Gen",
					"Nom",
				]),
				number: abstractFeatureAtomSchemas.number.extract([
					"Plur",
					"Sing",
				]),
			}),
		),
	})
	.strict() satisfies z.ZodSchema<DeNounFeatures>;
