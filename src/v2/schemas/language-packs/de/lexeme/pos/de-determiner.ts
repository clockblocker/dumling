import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type {
	DeDeterminerInherentFeatures,
	DeDeterminerInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-determiner";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
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
	) satisfies z.ZodType<DeDeterminerInherentFeatures>;

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
	) satisfies z.ZodType<DeDeterminerInflectionalFeatures>;

export const deDeterminerLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "DET",
	inherentFeaturesSchema: deDeterminerInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "DET">>;

export const deDeterminerSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deDeterminerLemmaSchema,
	inflectionalFeaturesSchema: deDeterminerInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "DET">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "DET">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "DET">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "DET">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "DET">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "DET">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "DET">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "DET">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "DET">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "DET">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "DET">>;
	};
};
