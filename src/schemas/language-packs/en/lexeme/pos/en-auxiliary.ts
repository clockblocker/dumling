import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	type EnInflectableLexemeSchemaBundleFor,
	buildEnInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-en-lexeme-schema-bundle";
import {
	enMoodSchema,
	enPersonSchema,
	enStyleSchema,
	enTenseSchema,
	enVerbFormSchema,
} from "../shared/en-common-feature-schemas";

const enLanguageSchema = z.literal("en");

const enAuxiliaryInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	style: enStyleSchema.extract(["Arch", "Vrnc"]),
} as const;

export const enAuxiliaryInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enAuxiliaryInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "AUX">
	>;

const enAuxiliaryInflectionalFeatureShape = {
	mood: enMoodSchema,
	number: abstractFeatureAtomSchemas.number.extract(["Plur", "Sing"]),
	person: enPersonSchema,
	tense: enTenseSchema,
	verbForm: enVerbFormSchema.extract(["Fin", "Inf", "Part"]),
} as const;

export const enAuxiliaryInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(
			enAuxiliaryInflectionalFeatureShape,
		),
	) satisfies z.ZodType<
		InflectionalFeaturesFor<"en", "Lexeme", "AUX">
	>;

export const enAuxiliaryLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "AUX",
	inherentFeaturesSchema: enAuxiliaryInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "AUX">>;

export const enAuxiliarySchemas = buildEnInflectableLexemeSchemaBundle<"AUX">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enAuxiliaryLemmaSchema,
	inflectionalFeaturesSchema: enAuxiliaryInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"AUX">;
