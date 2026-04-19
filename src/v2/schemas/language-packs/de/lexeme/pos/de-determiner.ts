import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	type DeInflectableLexemeSchemaBundleFor,
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import {
	deCaseSchema,
	deDefiniteSchema,
	deDegreeSchema,
	deGenderSchema,
	deNumberSchema,
	dePersonSchema,
	dePoliteSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deDeterminerInflectionalGenderSchema = z.union([
	z.literal("Masc"),
	z.literal("Neut"),
	z.tuple([z.literal("Masc"), z.literal("Neut")]),
	z.tuple([z.literal("Neut"), z.literal("Masc")]),
]);

const deDeterminerInherentFeatureShape = {
	definite: deDefiniteSchema,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "DET"]),
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Ord"]),
	person: dePersonSchema,
	polite: dePoliteSchema,
	poss: abstractFeatureAtomSchemas.poss,
	pronType: abstractFeatureAtomSchemas.pronType.extract([
		"Art",
		"Dem",
		"Emp",
		"Exc",
		"Ind",
		"Int",
		"Neg",
		"Prs",
		"Rel",
		"Tot",
	]),
} as const;

export const deDeterminerInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deDeterminerInherentFeatureShape,
	) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "DET">>;

export const deDeterminerInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			degree: deDegreeSchema,
			gender: deDeterminerInflectionalGenderSchema,
			"gender[psor]": featureValueSet(deGenderSchema),
			number: deNumberSchema,
			"number[psor]": deNumberSchema,
		}),
	) satisfies z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "DET">>;

export const deDeterminerLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "DET",
	inherentFeaturesSchema: deDeterminerInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "DET">>;

export const deDeterminerSchemas = buildDeInflectableLexemeSchemaBundle<"DET">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deDeterminerLemmaSchema,
	inflectionalFeaturesSchema: deDeterminerInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"DET">;
