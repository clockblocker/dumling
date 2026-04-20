import { z } from "zod/v3";
import type { InherentFeaturesFor, Lemma } from "../../../../../public-types";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	type DeUninflectableLexemeSchemaBundleFor,
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

export const deCoordinatingConjunctionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema({
		conjType: z.literal("Comp"),
	}) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "CCONJ">>;

export const deCoordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "CCONJ",
	inherentFeaturesSchema: deCoordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "CCONJ">>;

export const deCoordinatingConjunctionSchemas =
	buildDeUninflectableLexemeSchemaBundle<"CCONJ">({
		languageSchema: deLanguageSchema,
		lemmaSchema: deCoordinatingConjunctionLemmaSchema,
	}) satisfies DeUninflectableLexemeSchemaBundleFor<"CCONJ">;
