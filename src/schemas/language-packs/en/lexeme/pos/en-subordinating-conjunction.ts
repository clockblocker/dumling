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

const enSubordinatingConjunctionInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADP", "SCONJ"]),
	style: abstractFeatureAtomSchemas.style.extract(["Vrnc"]),
} as const;

export const enSubordinatingConjunctionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enSubordinatingConjunctionInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "SCONJ">
	>;

export const enSubordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SCONJ",
	inherentFeaturesSchema: enSubordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "SCONJ">>;

export const enSubordinatingConjunctionSchemas = buildEnUninflectableLexemeSchemaBundle<"SCONJ">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enSubordinatingConjunctionLemmaSchema,
}) satisfies EnUninflectableLexemeSchemaBundleFor<"SCONJ">;
