import { z } from "zod/v3";
import type {
	DePunctuationInherentFeatures,
	DePunctuationLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-punctuation";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	type DeUninflectableLexemeSchemaBundleFor,
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

export const dePunctuationInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	{
		punctType: abstractFeatureAtomSchemas.punctType,
	},
) satisfies z.ZodType<DePunctuationInherentFeatures>;

export const dePunctuationLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PUNCT",
	inherentFeaturesSchema: dePunctuationInherentFeaturesSchema,
}) satisfies z.ZodType<DePunctuationLemma>;

export const dePunctuationSchemas =
	buildDeUninflectableLexemeSchemaBundle<"PUNCT">({
		languageSchema: deLanguageSchema,
		lemmaSchema: dePunctuationLemmaSchema,
	}) satisfies DeUninflectableLexemeSchemaBundleFor<"PUNCT">;
