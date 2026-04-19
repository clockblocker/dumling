import { z } from "zod/v3";
import type {
	DeAuxiliaryInherentFeatures,
	DeAuxiliaryLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-auxiliary";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	type DeInflectableLexemeSchemaBundleFor,
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import { deVerbalInflectionalFeaturesSchema } from "../shared/de-verbal-inflectional-feature-schema";

const deLanguageSchema = z.literal("de");

export const deAuxiliaryInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	{
		verbType: z.literal("Mod"),
	},
) satisfies z.ZodType<DeAuxiliaryInherentFeatures>;

export const deAuxiliaryLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "AUX",
	inherentFeaturesSchema: deAuxiliaryInherentFeaturesSchema,
}) satisfies z.ZodType<DeAuxiliaryLemma>;

export const deAuxiliarySchemas = buildDeInflectableLexemeSchemaBundle<"AUX">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAuxiliaryLemmaSchema,
	inflectionalFeaturesSchema: deVerbalInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"AUX">;
