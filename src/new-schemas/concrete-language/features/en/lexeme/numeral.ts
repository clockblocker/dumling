import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { EnNumeralFeatures } from "../../../../../types/concrete-language/features/en/lexeme/numeral";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const enLanguageSchema = z.literal("en");

const enNumeralFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			extPos: abstractFeatureAtomSchemas.extPos.extract(["PROPN"]),
			numForm: abstractFeatureAtomSchemas.numForm.extract([
				"Digit",
				"Roman",
				"Word",
			]),
			numType: abstractFeatureAtomSchemas.numType.extract([
				"Card",
				"Frac",
			]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<EnNumeralFeatures>;

export const enNumeralSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NUM",
	featuresSchema: enNumeralFeaturesSchema,
});
