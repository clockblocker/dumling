import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeDiscourseFormulaPhrasemeFeatures } from "../../../../../types/concrete-language/features/de/phraseme/discourse-formula";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deDiscourseFormulaPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			discourseFormulaRole:
				abstractFeatureAtomSchemas.discourseFormulaRole,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeDiscourseFormulaPhrasemeFeatures>;

export const deDiscourseFormulaPhrasemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: deLanguageSchema,
		lemmaKind: "Phraseme",
		lemmaSubKind: "DiscourseFormula",
		featuresSchema: deDiscourseFormulaPhrasemeFeaturesSchema,
	});
