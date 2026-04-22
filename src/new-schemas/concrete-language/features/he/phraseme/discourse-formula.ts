import { z } from "zod/v3";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { HeDiscourseFormulaPhrasemeFeatures } from "../../../../../types/concrete-language/features/he/phraseme/discourse-formula";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const heLanguageSchema = z.literal("he");

const heDiscourseFormulaPhrasemeFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<HeDiscourseFormulaPhrasemeFeatures>;

export const heDiscourseFormulaPhrasemeSchemas =
	buildUninflectableConcreteSchemaBundle({
		languageSchema: heLanguageSchema,
		lemmaKind: "Phraseme",
		lemmaSubKind: "DiscourseFormula",
		featuresSchema: heDiscourseFormulaPhrasemeFeaturesSchema,
	});
