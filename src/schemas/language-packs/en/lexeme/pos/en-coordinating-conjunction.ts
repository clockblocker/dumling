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
import {
	enPolaritySchema,
} from "../shared/en-common-feature-schemas";

const enLanguageSchema = z.literal("en");

const enCoordinatingConjunctionInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	polarity: enPolaritySchema.extract(["Neg"]),
} as const;

export const enCoordinatingConjunctionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enCoordinatingConjunctionInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "CCONJ">
	>;

export const enCoordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "CCONJ",
	inherentFeaturesSchema: enCoordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "CCONJ">>;

export const enCoordinatingConjunctionSchemas = buildEnUninflectableLexemeSchemaBundle<"CCONJ">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enCoordinatingConjunctionLemmaSchema,
}) satisfies EnUninflectableLexemeSchemaBundleFor<"CCONJ">;
