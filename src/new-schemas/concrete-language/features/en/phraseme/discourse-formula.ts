import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnDiscourseFormulaPhrasemeFeatures } from "../../../../../types/concrete-language/features/en/phraseme/discourse-formula";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enDiscourseFormulaPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			discourseFormulaRole:
				abstractFeatureAtomSchemas.discourseFormulaRole,
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnDiscourseFormulaPhrasemeFeatures>;

export const enDiscourseFormulaPhrasemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: enLanguageSchema,
		lemmaKind: "Phraseme",
		lemmaSubKind: "DiscourseFormula",
		featuresSchema: enDiscourseFormulaPhrasemeFeaturesSchema,
	});
