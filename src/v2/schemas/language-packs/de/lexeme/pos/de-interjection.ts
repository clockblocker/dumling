import { z } from "zod/v3";
import type {
	DeInterjectionInherentFeatures,
	DeInterjectionLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-interjection";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	type DeUninflectableLexemeSchemaBundleFor,
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

export const deInterjectionInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	{
		partType: z.literal("Res"),
	},
) satisfies z.ZodType<DeInterjectionInherentFeatures>;

export const deInterjectionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "INTJ",
	inherentFeaturesSchema: deInterjectionInherentFeaturesSchema,
}) satisfies z.ZodType<DeInterjectionLemma>;

export const deInterjectionSchemas =
	buildDeUninflectableLexemeSchemaBundle<"INTJ">({
		languageSchema: deLanguageSchema,
		lemmaSchema: deInterjectionLemmaSchema,
	}) satisfies DeUninflectableLexemeSchemaBundleFor<"INTJ">;
