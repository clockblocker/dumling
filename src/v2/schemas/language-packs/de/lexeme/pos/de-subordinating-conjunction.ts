import { z } from "zod/v3";
import type {
	DeSubordinatingConjunctionInherentFeatures,
	DeSubordinatingConjunctionLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-subordinating-conjunction";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	type DeUninflectableLexemeSchemaBundleFor,
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

export const deSubordinatingConjunctionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema({
		conjType: z.literal("Comp"),
	}) satisfies z.ZodType<DeSubordinatingConjunctionInherentFeatures>;

export const deSubordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SCONJ",
	inherentFeaturesSchema: deSubordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<DeSubordinatingConjunctionLemma>;

export const deSubordinatingConjunctionSchemas =
	buildDeUninflectableLexemeSchemaBundle<"SCONJ">({
		languageSchema: deLanguageSchema,
		lemmaSchema: deSubordinatingConjunctionLemmaSchema,
	}) satisfies DeUninflectableLexemeSchemaBundleFor<"SCONJ">;
