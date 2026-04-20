import { z } from "zod/v3";
import type { InherentFeaturesFor, Lemma } from "../../../../../types/public-types";
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
	}) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "SCONJ">>;

export const deSubordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SCONJ",
	inherentFeaturesSchema: deSubordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "SCONJ">>;

export const deSubordinatingConjunctionSchemas =
	buildDeUninflectableLexemeSchemaBundle<"SCONJ">({
		languageSchema: deLanguageSchema,
		lemmaSchema: deSubordinatingConjunctionLemmaSchema,
	}) satisfies DeUninflectableLexemeSchemaBundleFor<"SCONJ">;
