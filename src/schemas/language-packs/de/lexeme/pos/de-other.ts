import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../types/public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	type DeInflectableLexemeSchemaBundleFor,
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import {
	deCaseSchema,
	deGenderSchema,
	deMoodSchema,
	deNumberSchema,
	deVerbFormSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deOtherInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	hyph: abstractFeatureAtomSchemas.hyph,
	numType: abstractFeatureAtomSchemas.numType.extract([
		"Card",
		"Mult",
		"Range",
	]),
} as const;

export const deOtherInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	deOtherInherentFeatureShape,
) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "X">>;

export const deOtherInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		case: deCaseSchema,
		gender: deGenderSchema,
		mood: deMoodSchema,
		number: deNumberSchema,
		verbForm: deVerbFormSchema,
	}),
) satisfies z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "X">>;

export const deOtherLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "X",
	inherentFeaturesSchema: deOtherInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "X">>;

export const deOtherSchemas = buildDeInflectableLexemeSchemaBundle<"X">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deOtherLemmaSchema,
	inflectionalFeaturesSchema: deOtherInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"X">;
