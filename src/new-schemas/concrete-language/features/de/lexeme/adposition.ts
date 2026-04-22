import { z } from "zod/v3";
import { abstractFeatureAtomSchemas } from "../../../../../schemas/abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../../schemas/shared/feature-helpers";
import type { DeAdpositionFeatures } from "../../../../../types/concrete-language/features/de/lexeme/adposition";
import { buildUninflectableConcreteSchemaBundle } from "../../../../shared/build-concrete-schema-bundle";

const deLanguageSchema = z.literal("de");

const deAdpositionFeaturesSchema = z
	.object({
		inherent: buildOptionalFeatureObjectSchema({
			abbr: abstractFeatureAtomSchemas.abbr,
			adpType: abstractFeatureAtomSchemas.adpType.extract([
				"Circ",
				"Post",
				"Prep",
			]),
			extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "SCONJ"]),
			foreign: abstractFeatureAtomSchemas.foreign,
			governedCase: abstractFeatureAtomSchemas.governedCase,
			partType: abstractFeatureAtomSchemas.partType.extract(["Vbp"]),
		}),
		inflectional: buildOptionalFeatureObjectSchema({}),
	})
	.strict() satisfies z.ZodSchema<DeAdpositionFeatures>;

export const deAdpositionSchemas = buildUninflectableConcreteSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADP",
	featuresSchema: deAdpositionFeaturesSchema,
});
