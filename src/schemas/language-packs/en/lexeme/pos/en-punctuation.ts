import { z } from "zod/v3";
import type {
	InherentFeaturesFor,
	Lemma,
} from "../../../../../types/public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
} from "../../../../shared/feature-helpers";
import {
	type EnUninflectableLexemeSchemaBundleFor,
	buildEnUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-en-lexeme-schema-bundle";

const enLanguageSchema = z.literal("en");

const enPunctuationInherentFeatureShape = {
} as const;

export const enPunctuationInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enPunctuationInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "PUNCT">
	>;

export const enPunctuationLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PUNCT",
	inherentFeaturesSchema: enPunctuationInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "PUNCT">>;

export const enPunctuationSchemas = buildEnUninflectableLexemeSchemaBundle<"PUNCT">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enPunctuationLemmaSchema,
}) satisfies EnUninflectableLexemeSchemaBundleFor<"PUNCT">;
